namespace trustednotary {
    declare let Pace: HubSpotPaceInterfaces.Pace;

    export class PageLoad {
        constructor() {
            this.on();
        }

        on(): void {
            window.onload = () => {
                Pace.on("done", () => {
                    let elem = document.getElementById("page-loading");
                    if (elem) {
                        this.off(elem);
                    }
                });
            }
        }

        off(element: HTMLElement): void {
            document.body.classList.remove("ui-overflowHidden");
            element.classList.toggle("fade");

            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 2000);
        }
    }

    let pageLoad = new trustednotary.PageLoad();
}