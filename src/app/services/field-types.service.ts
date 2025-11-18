
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FieldTypesService {
    private types: any[] = [];

    getAll(){
        return this.types;
    }

    get(type: string){
        return this.types.find(t => t.type === type);
    }
}