import { Component, input } from "@angular/core";
import { Seccion } from "../../models/acuse";

@Component({
  selector: 'app-section-dos',
  imports: [],
  template: `
        <P>Seccion 2</P>
  `,
  styles: ``,
})
export class SectionDos {
  field = input.required<Seccion>();
}
