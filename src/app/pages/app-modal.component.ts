import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: 'app-modal.component.html',
    styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {
    form: FormGroup | undefined;
    @Input() event: any;
    
    constructor(public activeModal: NgbActiveModal) {}
    
    ngOnInit(): void {
        
    }
    
    createForm(): void {
        //   this.form = this.formBuilder.group({
        //     calendarId: [this.data.element.id],
        //     isDriver: [this.data.isDriver],
        //     personId: [''],
        //     isCollect: [this.data.isCollect || false]
        //   });
    }
    
    onNoClick(): void {
        this.activeModal.close();
    }
    
    onSubmit(): void {
        
    }
    
    maskPhone(value: string): string {

        if (value === undefined)
            return ''
        debugger
        return value
        .replace(/\D/g, '') // remove tudo que não é dígito
        .replace(/^(\d{2})(\d)/, '($1) $2') // coloca parênteses no DDD
        .replace(/(\d{5})(\d{4})$/, '$1-$2'); // coloca o traço
    }
}