import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
interface UserInterface {
  email: string;
  fullName: string;
  id: number;
  roles: string[];
  img: string;
}
@Injectable({
  providedIn: 'root',
})
export class RuserService extends EntityCollectionServiceBase<UserInterface> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}
