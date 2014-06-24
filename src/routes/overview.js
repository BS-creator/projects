import {ComponentDirective} from 'templating';
import {GhService} from 'services';

@ComponentDirective
export class Overview {
  constructor(service:GhService) {
    this.service = service;
  }

  activate(){
    return this.service.allIssues().then((issues) =>{
      this.issues = issues;
    });
  }
}