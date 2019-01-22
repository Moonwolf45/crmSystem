import { ElementRef } from "@angular/core";

declare var M;

export interface MaterialInstance {
    open?(): void
    close?(): void
    destroy?(): void
}

export interface MaterialDatepicker extends MaterialInstance{
    date?: Date
}

export class MaterialService {

    static toast (message: string) {
        M.toast({html: message});
    }

    static initializeFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement);
    }

    static updateTextInputs() {
        M.updateTextFields();
    }

    static initModal(ref: ElementRef): MaterialInstance {
        return M.Modal.init(ref.nativeElement);
    }

    static initTooltip(ref: ElementRef): MaterialInstance {
        return M.Tooltip.init(ref.nativeElement);
    }

    static initDatepicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
        return M.Datepicker.init(ref.nativeElement, {
            format: 'dd.mm.yyyy',
            showClearBtn: true,
            firstDay: 1,
            i18n: {
                months: [
                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
                    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                ],
                monthsShort: [
                    'Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'
                ],
                weekdays: [
                    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
                ],
                weekdaysShort: [
                    'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
                ],
                weekdaysAbbrev: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            },
            onClose
        });
    }

    static initTapTarget(ref: ElementRef): MaterialInstance {
        return M.TapTarget.init(ref.nativeElement);
    }

}
