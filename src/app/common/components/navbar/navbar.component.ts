import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    timeSpentInApp: string = '0';
    private resizeTimeout: any;
    private intervalId: any;
    private startTime: number;

    constructor() { }

    ngOnInit() {
        this.startTime = Date.now();
        this.intervalId = setInterval(() => this.updateTimeSpent(), 1000);
    }

    ngAfterViewInit() {
        this.setPageOffset();
    }

    @HostListener('window:resize')
    onResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
            this.setPageOffset();
        }, 200); // Delay in milliseconds
    }

    private setPageOffset() {
        requestAnimationFrame(() => {
            const divElem: HTMLElement | null = document.getElementById("fix-h");
            if (divElem) {
                divElem.style.height = (window.innerHeight - divElem.offsetTop) + 'px';
            }
        });
    }

    private updateTimeSpent() {
        const elapsedTime: number = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes: number = Math.floor(elapsedTime / 60);
        const seconds: number = elapsedTime % 60;
        this.timeSpentInApp = this.formatTime(minutes, seconds);
    }

    private formatTime(minutes: number, seconds: number): string {
        const minuteLabel: "minute" | "minutes" = minutes === 1 ? 'minute' : 'minutes';
        const secondLabel: "second" | "seconds" = seconds === 1 ? 'second' : 'seconds';
        return minutes ? `${minutes} ${minuteLabel} and ${seconds} ${secondLabel}` : `${seconds} ${secondLabel}`;
    }

    ngOnDestroy() {
        clearInterval(this.intervalId); // Clear the interval when the component is destroyed
    }

}