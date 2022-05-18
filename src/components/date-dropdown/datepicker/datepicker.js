import datepickerjs from 'Datepicker.js';

export class Datepicker {
    constructor(node) {
        this.root = node;
        this.initValue = this.root.dataset.initValue ? JSON.parse(this.root.dataset.initValue) : false;
        this.dateSentEvent = 'datepicker-date-sent';

        this.init();
    }

    getDatepickerData(element, datepicker) {
        this.selectedCells = element.querySelectorAll('.datepicker__day.is-selected');
        this.selectedDates = datepicker.getDate();
    }

    addStartEndRangeClasses() {
        const startTimestamp = new Date(this.selectedDates[0]).getTime();
        const endTimestamp = new Date(this.selectedDates[this.selectedDates.length - 1]).getTime();

        if (this.selectedCells.length && startTimestamp && Number(this.selectedCells[0].dataset.day) === startTimestamp) {
            this.selectedCells[0].classList.add('is-startRange')
        }
        if (this.selectedCells.length && endTimestamp && Number(this.selectedCells[this.selectedCells.length - 1].dataset.day) === endTimestamp) {
            this.selectedCells[this.selectedCells.length - 1].classList.add('is-endRange');
        }
    }

    sendDates = (dates) => {
        this.root.dispatchEvent(new CustomEvent('datepicker-date-sent', {
            detail: {
                dates: dates[0] ? dates : ''
            }
        }))
    }

    setInitValue(datepicker) {
        datepicker.setDate(this.initValue);
        datepicker.goToDate(this.initValue[0]);

        this.sendDates(this.initValue);
    }

    setDatepickerClearEventListener(datepicker) {
        this.root.addEventListener('datepicker-clear', (e) => {
            datepicker.setDate('');
            datepicker.render()
        })
    }

    setOnRenderCallback(datepicker) {
        datepicker.set({
            onRender: (element) => {
                this.getDatepickerData(element, datepicker);
                this.addStartEndRangeClasses(element, datepicker);
            }
        })
    }

    setDatepicker() {
        const datepicker = new datepickerjs(this.root, {
            inline: true,
            ranged: true,
            openOn: this.initValue ? 'first' : 'today',
            weekStart: 1,
            min: Date.now() - 1000 * 60 * 60 * 24,
            onChange: (date) => this.sendDates([date[0], date[date.length - 1]]),
            i18n: {
                months: [
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь"
                ],
                weekdays: [
                    {"full": "Понедельник", "abbr": "Пн"},
                    {"full": "Вторник", "abbr": "Вт"},
                    {"full": "Среда", "abbr": "Ср"},
                    {"full": "Четверг", "abbr": "Чт"},
                    {"full": "Пятница", "abbr": "Пт"},
                    {"full": "Суббота", "abbr": "Сб"},
                    {"full": "Воскресенье", "abbr": "Вс"}
                ],
            },
            templates: {
                header: [
                    '<div class="datepicker__header">',
                        `<button class="datepicker__prev<%= (hasPrev) ? "" : " is-disabled" %> _icon-arrow_back" title="Предыдущий месяц" aria-label="Предыдущий месяц" data-prev></button>`,
                        '<span class="datepicker__title" id="datepicker-title">',
                            '<span><%= month %></span>',
                            '&nbsp;',
                            '<span><%= year %></span>',
                        '</span>',
                        `<button class="datepicker__next<%= (hasNext) ? "" : " is-disabled" %> _icon-arrow_forward" title="Следующий месяц" aria-label="Следующий месяц" data-next></button>`,
                  '</div>'
                ].join(''),
                calendar: [
                    '<table class="datepicker__calendar" aria-labelledby="datepicker-title">',
                        '<thead>',
                            '<tr class=datepicker__row>',
                            '<% weekdays.forEach(function(name) { %>',
                                '<th class=datepicker__weekday><abbr title=<%= name.full %>><%= name.abbr %></abbr></th>',
                            '<% }); %>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<% days.forEach(function(day, i) { %>',
                            '<%= (i % 7 == 0) ? "<tr class=datepicker__row>" : "" %>',
                                '<%= renderDay(day) %>',
                            '<%= (i % 7 == 6) ? "</tr>" : "" %>',
                            '<% }); %>',
                        '</tbody>',
                    '</table>',
                  ].join(''),
                day: [
                    '<% classNames.push("datepicker__day"); %>',
                    `<td class="<%= classNames.join(" ") %>" data-day="<%= timestamp %>" title="<%= new Intl.DateTimeFormat('ru-RU', {month: 'long', day: 'numeric'}).format(timestamp) %>" aria-label="<%= new Intl.DateTimeFormat("ru-RU", {month: "long", day: "numeric"}).format(timestamp) %>" aria-selected="<%= isSelected ? "true" : "false" %>">`,
                        '<%= daynum %>',
                    '</td>'
                ].join('')
            }
        });

        if (this.initValue) { this.setInitValue(datepicker); }

        this.setOnRenderCallback(datepicker);
        this.setDatepickerClearEventListener(datepicker);
    }

    init() {
        this.setDatepicker();
    }
}

const datepickers = document.querySelectorAll('.js-datepicker');
if (datepickers.length > 0) {
    datepickers.forEach((node) => new Datepicker(node));
}