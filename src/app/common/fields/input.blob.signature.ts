import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import { LanguageMng } from '../languageMng';
import { FieldBlob } from '../baseIUElements';
import { Util } from '../app.utils';

/**
 * Componente para capturar una firma, con pantalla táctil o con ratón
 */
@Component({
    selector: 'imes-input-blob-signature',
    templateUrl: './inputblobsignature.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputBlobSignatureComponent implements AfterViewInit {

    /** Blob field */
    protected intField!: FieldBlob;

    /** Canvas */
    @ViewChild('sigPad', { static: false }) sigPad: any;
    /** Elemento Canvas */
    private sigPadElement!: HTMLCanvasElement;
    /** Contexto 2d del Canvas */
    private context: any;
    /** Flag que indica si está pintando o no  */
    private isDrawing = false;
    /** Array de puntos en el que iremos añadiendo conforme se mueva por encima del canvas en un Touch screen */
    private points: { x: number, y: number }[] = [];
    /** Timer para el pintado del array de puntos en un Touch screen */
    private readonly periodoTimer = 25;
    /** Identifica si es una pantalla tactil */
    private touchScreen = false;

    @Input()
    set field(field: FieldBlob) {
        this.intField = field;
    }
    get field(): FieldBlob { return this.intField; }

    /** Change value event */
    @Output() valueChanged = new EventEmitter<any>();

    constructor(public readonly langMng: LanguageMng, public readonly util: Util,
        protected changeDetectorRef: ChangeDetectorRef) {

        if ('ontouchstart' in window) {
            this.touchScreen = true;
        }
        else {
            this.touchScreen = false;
        }
    }

    ngAfterViewInit() {
        // Inicializamos las variables del Canvas
        this.sigPadElement = this.sigPad.nativeElement;
        
        // Valores del contexto
        this.context = this.sigPadElement.getContext('2d');
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 1;


        // Identificamos si es una pantalla táctil
        if (this.touchScreen) {
            // Activamos el timeout de la ventana para que se pinten los puntos del array
            window.setTimeout(() => this.processTimerPintar(), this.periodoTimer);

            this.sigPadElement.addEventListener('touchmove', (evt) => {
                // Cancelamos el comportamiento por defecto
                evt.preventDefault();

                // Añadimos el punto al array para que luego sea pintado
                let offSets = this.calcularOffsets(evt.touches[0].target);
                let x = evt.touches[0].pageX - offSets.offsetX;
                let y = evt.touches[0].pageY - offSets.offsetY;
                this.points.push({ x, y });
            },);

        } else {
            // Caso de NO detectar Touch screen
            // Cuando se pinche con el raton
            this.sigPadElement.addEventListener("mousedown", (ev: any) => {
                this.isDrawing = true;
                this.context.beginPath();
                // Si tenemos el offset (firefox no lo tiene) lo utilizamos, sino lo calculamos 
                if (ev.offsetX != null){
                    this.context.moveTo(ev.offsetX, ev.offsetY);
                }
                else{
                    this.context.moveTo(ev.clientX - ev.currentTarget['offsetLeft'], ev.clientY - ev.currentTarget['offsetTop']);
                }					
            }, false);

            // Al levantar el pulsador del raton, dejamos de pintar
            this.sigPadElement.addEventListener('mouseup', () => {
                this.isDrawing = false;
                this.context.closePath();
                this.save();
            }, false);
            // Si salimos del Canvas, dejamos de pintar
            this.sigPadElement.addEventListener('mouseout', () => {
                this.isDrawing = false;
                this.context.closePath();
                this.save();
            }, false);
            
            // Cuando movemos el raton, si estamos pintando, pintamos
            this.sigPadElement.addEventListener("mousemove", (e: any) => {
                if (this.isDrawing) {
                    // Pintamos. Si no tenemos el offset lo calculamos                    
                    if (e.offsetX != null){
                        this.context.lineTo(e.offsetX, e.offsetY);
                        this.context.stroke();
                    }
                    else {
                        let offSets = this.calcularOffsets(e.currentTarget);
                        // this.context.lineTo(e.clientX - e.currentTarget['offsetLeft'], e.clientY - e.currentTarget['offsetTop']);
                        this.context.lineTo(e.clientX - offSets.offsetX, e.clientY - offSets.offsetY);
                        this.context.stroke();
                    }
                }
            }, false);
        }

        // Refrescamos la pantalla para que el Canvas tome los valores de ancho y alto que indiquen las CSS
        window.setTimeout( () => {
            this.changeDetectorRef.markForCheck();
            // Pintamos un recuadro blanco en todo el canvas porque el formato jpeg no permite transparencias y no las queremos
            //  para cumplir el formato PDF/A
            this.context.fillStyle = 'white';
            this.context.fillRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
        }, 50);
    }

    /**
     * Devuelve los offset del elemento pasado como argumento
     * @param target Elemento del cual se desea saber el offset
     */
    private calcularOffsets(target: any): {offsetX: number, offsetY: number} {
        let offSets: {offsetX: number, offsetY: number} = {offsetX: 0, offsetY: 0};

        if (target['offsetLeft']) {
            offSets.offsetX = target['offsetLeft'];
        }
        if (target['offsetTop']) {
            offSets.offsetY = target['offsetTop'];
        }

        if (target['offsetParent']) {
            const offSetParent = this.calcularOffsets(target['offsetParent']);
            offSets.offsetX += offSetParent.offsetX;
            offSets.offsetY += offSetParent.offsetY;
        }

        return offSets;
    }

    /**
     * Pinta líneas entre los puntos capturados al moverse por el touch pad
     */
    private processTimerPintar(): void {
        // Recorremos los puntos del array y pintamos una linea desde el primero al último
        let puntoDesde: {x: number, y: number};
        let puntoHasta: {x: number, y: number} = {x: -1, y: -1};
        if (this.points.length > 1) {
            this.context.beginPath();
            puntoDesde = this.points[0];
            this.context.moveTo(puntoDesde.x, puntoDesde.y);
            for (let index = 1; index < this.points.length; index++) {
                puntoHasta = this.points[index];
                this.context.lineTo(puntoHasta.x, puntoHasta.y);
                this.context.stroke();
            }
            this.context.closePath();
            this.save();
        }
        // Vaciamos el array
        this.points = [];
        // Nos guardamos el último punto para continuar pintando
        if (puntoHasta.x != -1) {
            this.points.push(puntoHasta);
        }
        // Volvemos a activar el timer de la ventana
        window.setTimeout(() => this.processTimerPintar(), this.periodoTimer);
    }

    /**
     * Devuelve la altura a aplicar al elemento Canvas. La toma de la aplicada por CSS
     */
    public getHeight(): number {
        if (this.sigPadElement) {
            // return this.sigPadElement.style.height;
            return this.sigPadElement.clientHeight;
        }
        return 150;
    }

    /**
     * Devuelve la anchura a aplicar al elemento Canvas. La toma de la aplicada por CSS
     */
    public getWidth(): number {
        if (this.sigPadElement) {
            return this.sigPadElement.clientWidth;
        }
        return 300;
    }
    /**
     * Borra el Canvas
     */
    public clear(): void {
        this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
        this.context.beginPath();
        this.intField.setValue(null);
        // Pintamos un recuadro blanco en todo el canvas porque el formato jpeg no permite transparencias y no las queremos
        //  para cumplir el formato PDF/A
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    }

    /**
     * Guarda la imagen de la firma en el field
     */
    private save(): void {
        // En formato JPG
        let datos = this.sigPadElement.toDataURL('image/jpeg', 1.0); 
        if (datos && datos.indexOf(',') > -1) {
            datos = datos.substring(datos.indexOf(',') + 1);
            this.intField.setValue(datos);
        }
    }
}
