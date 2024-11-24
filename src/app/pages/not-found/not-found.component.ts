import { Component } from '@angular/core';
import { LayoutBaseComponent } from '../../components/layout-base/layout-base.component';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LayoutBaseComponent, RouterLinkWithHref],
  template: `
    <app-layout-base>
      <div class="flex justify-center justify-content-center">
        <div>
          <span class="text-2xl block mb-3">DESCULPE, não encontramos a página 😓</span>
          <a routerLink="" class="text-primary">Página inicial</a>
        </div>
      </div>
    </app-layout-base>
  `
})
export class NotFoundComponent {

}
