import { baseComponent, Component } from "./component.js";

// Composable이란 다른 요소들을 함께 조립해서 묶을 수 있는 것
export interface Composable {
  addChild(child: Component): void;
}

export class PageComponent
  extends baseComponent<HTMLUListElement>
  implements Composable {
  constructor() {
    super(`<ul class='page'></ul>`);
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
  }
}

export class PageItemComponent
  extends baseComponent<HTMLUListElement>
  implements Composable {
  constructor() {
    super(`
      <li class="page-item">
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="close">&times;</button>
        </div>
      </li>
    `);

    const closeButton = this.element.querySelector(
      ".close"
    )! as HTMLButtonElement;
    closeButton.addEventListener("click", () => {
      (this.element.parentElement! as HTMLUListElement).removeChild(
        this.element
      );
    });
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
}
