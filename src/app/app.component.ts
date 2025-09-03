import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { AppService } from './app.service';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Locacao } from './model/locacao';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
  
  view: CalendarView = CalendarView.Month;

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;
  
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = true;
  viewDate: Date = new Date();
  refresh: Subject<void> = new Subject();
  events: CalendarEvent[] = [];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit',event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Delete', event);
      },
    },
  ];
  
  constructor(private appService: AppService,
              private modal: NgbModal
  ){
    
  }


  
  ngOnInit(): void {
    const data = new Date();
    const ultimoDia = endOfMonth(data);
    const ultimoDiaFormatado = format(ultimoDia, 'yyyy-MM-dd'); 
    
    // 2 - pegar primeiro dia do mês
    const primeiroDia = startOfMonth(data);
    const primeiroFormatado = format(primeiroDia, 'yyyy-MM-dd');
    this.loadEvents(primeiroFormatado,ultimoDiaFormatado);
  }
  
  handleEvent(action: string, event: CalendarEvent) {
    this.modalData = { event, action};
    this.modal.open(this.modalContent, { size: 'sm' });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
  }

  loadEvents(dataInicial: string, dataFinal: string){
    this.appService.getCalendarView(dataInicial,dataFinal).subscribe(data => {
      this.events = [];
      
      
      this.events = data.map((evento: { start: string | number | Date; end: string | number | Date; title: string, status: string; clienteFull: string; equipamentoFull: string; motoristaRecolhe: string; motoristaEntrega: string; color: string }): CalendarEvent<Locacao> => {
        let color_;
        
        color_ = { primary: evento.color, secondary: '#D2E3FC' }; // confirmada
        
        return {
          ...evento,
          start: new Date(evento.start),
          end: new Date(evento.end),
          title: evento.title,
          color: color_,
          meta: {
            status: evento.status == '1' ? 'Confirmada' : 'Pendente',
            clienteFull: evento.clienteFull,
            equipamentoFull: evento.equipamentoFull,
            motoristaRecolhe: evento.motoristaRecolhe,
            motoristaEntrega: evento.motoristaEntrega
          }
        };
      });
    });
  }
  
  closeOpenMonthViewDay(event: any) {
    
    const data = new Date(event);
    const ultimoDia = endOfMonth(data);
    
    const ultimoDiaFormatado = format(ultimoDia, 'yyyy-MM-dd'); 
    
    // 2 - pegar primeiro dia do mês
    const primeiroDia = startOfMonth(data);
    const primeiroFormatado = format(primeiroDia, 'yyyy-MM-dd');
    this.loadEvents(primeiroFormatado,ultimoDiaFormatado);
    this.activeDayIsOpen = false;
  }
}
