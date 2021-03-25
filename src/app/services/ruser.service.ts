import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RuserService extends EntityCollectionServiceBase<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}
