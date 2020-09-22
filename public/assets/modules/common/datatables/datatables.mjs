import { DataTableColumns } from '/assets/modules/common/datatables/columns.mjs';

class DTable {
    constructor() {
        let DTO = this;

        this._TABLE = null;

        this._GROUPTEXT = [];
        this._GROUPHEADCLASS = 'group';

        this._COLS = [];
        this._PGLENGTH = 10;
        this._LENGTHMENU = [10, 50, 100, 150];
        this._AUTOWIDTH = false;
        this._DOM = '<"datatable-scroll"t><"datatable-footer"ipl>';

        this._PROCESSING = true;
        this._SERVERSIDE = false;


        this._LANGUAGE = {
            SEARCH: {
                LABEL: '<span>Filter:</span> _INPUT_',
                PLACEHOLDER: 'Type to search...',
            },
            LENGTHMENU: '<span>Show:</span> _MENU_',
            PAGINATE: {
                'first': 'First',
                'last': 'Last',
                'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;',
                'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;'
            }
        }

        this._AJAX = false;

        this._INITCOMPLETE = function () {
            $(".datatable-scroll").removeClass('table-responsive').addClass('table-responsive');
            $("#dropdown_view_switch").prop('disabled', false);
            $("#dropdown_view_switch").css('background', '#78909C');
        }

        this._ROWCALLBACK = function (row, data) {
            $(row).attr('id', data.ID);
        }

        this._FNDRAWCALLBACK = function () {
            if (DTO._GROUPING == true) {
                DTO.groupBy(DTO);
            }

            DTO.unblockCard();
        };

        this._SORTING = [
            [0, "asc"]
        ];

        this._FIXEDHEAD = false;
        this._FIXEDFOOT = false;

        this._SCROLLY = false;
        this._SCROLLX = false;

        this._FIXEDHEIGHT = false;
    }

    set CARD(BLOCK) {
        // this.createAjaxObj();
        this._CARD = $(BLOCK).closest('.card');;
    }

    blockCard() {
        $(this._CARD).block({
            message: '<div class="pace-demo"><div class="theme_xbox"><div class="pace_activity"></div></div></div>',
            // message: '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
            overlayCSS: {
                backgroundColor: 'rgba(0, 0, 0)',
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none',
                backgroundColor: 'transparent'
            }
        });
    }

    unblockCard() {
        $(this._CARD).unblock();
    }

    set DATA(DATA) {
        this._DATA = DATA;
    }

    set URL(URL) {
        this.createAjaxObj();
        this._AJAX.URL = URL;
    }

    set PROCESSING(PROCESSING) {
        this._PROCESSING = PROCESSING
    }

    set SERVERSIDE(SERVERSIDE) {
        this._SERVERSIDE = SERVERSIDE
    }

    set METHOD(METHOD) {
        this.createAjaxObj();
        this._AJAX.METHOD = METHOD;
    }

    set DTSELECTOR(DTSELECTOR) {
        this.CARD = DTSELECTOR;
        this._DTSELECTOR = DTSELECTOR;
    }

    get DTSELECTOR() {
        return this._DTSELECTOR;
    }

    set COLS(COLS) {
        let ColObj = new DataTableColumns();

        ColObj.TITLE = COLS.TITLE;
        ColObj.NAME = COLS.NAME;
        ColObj.DEFAULT = COLS.DEFAULT;
        ColObj.DATA = COLS.DATA;
        ColObj.VISIBLE = COLS.VISIBLE;
        ColObj.RENDER = COLS.RENDER;
        ColObj.CLASS = COLS.CLASS;
        ColObj.ORDER = COLS.ORDER;

        (this._COLS).push(ColObj);
    }

    set PGLENGTH(PGLENGTH) {
        this._PGLENGTH = PGLENGTH;
    }

    set FIXEDHEAD(FIXEDHEAD) {
        this._FIXEDHEAD = FIXEDHEAD;
    }

    set FIXEDFOOT(FIXEDFOOT) {
        this._FIXEDFOOT = FIXEDFOOT;
    }

    set SCROLLY(SCROLLY) {
        this._SCROLLY = SCROLLY;
    }

    set SCROLLX(SCROLLX) {
        this._SCROLLX = SCROLLX;
    }

    set FIXEDHEIGHT(FIXEDHEIGHT) {
        this._FIXEDHEIGHT = FIXEDHEIGHT;
    }

    set AJAXDATA(AJAXDATA) {
        this.createAjaxObj();
        this._AJAX.DATA = AJAXDATA
    }

    set DATAFILTER(DATAFILTER) {
        this.createAjaxObj();
        this._AJAX.DATAFILTER = DATAFILTER
    }

    set INITCOMPLETE(INITCOMPLETE) {
        this._INITCOMPLETE = INITCOMPLETE;
    }

    set ROWCALLBACK(ROWCALLBACK) {
        this._ROWCALLBACK = ROWCALLBACK;
    }

    set LENGTHMENU(LENGTHMENU) {
        this._LENGTHMENU = LENGTHMENU;
    }

    set SORTING(SORTING) {
        this._SORTING = SORTING;
    }

    set FNDRAWCALLBACK(FNDRAWCALLBACK) {
        this._FNDRAWCALLBACK = FNDRAWCALLBACK
    }

    set GROUPCOLUMN(GROUPCOLUMN) {
        this._GROUPING = true;
        this._GROUPCOLUMN = GROUPCOLUMN;
    }

    set GROUPHEADCLASS(GROUPHEADCLASS) {
        this._GROUPHEADCLASS = GROUPHEADCLASS;
    }

    set GROUPTEXT(GROUPTEXT) {
        (this._GROUPTEXT).push(GROUPTEXT)
    }

    get TABLE() {
        return this._TABLE;
    }

    groupBy() {
        let DBTO = this;

        let col_count = 0;
        DBTO._COLS.forEach(element => {
            if (element.visible == true) {
                col_count++;
            }
        });

        if (typeof DBTO._GROUPCOLUMN != "undefined") {
            var api = $(DBTO._DTSELECTOR).dataTable().api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(DBTO._GROUPCOLUMN, { page: 'current' }).data().each(function (group, i) {

                if (last !== group) {

                    let API_DATA = api.row(i).data();

                    let GROUP_HEAD = '';
                    let aindex = 0;

                    (DBTO._GROUPTEXT).forEach(element => {
                        if (aindex == 0) {
                            GROUP_HEAD = API_DATA[element];
                        } else {
                            GROUP_HEAD += " ( <i> " + API_DATA[element] + "</i> ) ";
                        }

                        aindex++;
                    });

                    $(rows).eq(i).before(
                        `<tr class="` + DBTO._GROUPHEADCLASS + `">
                            <td colspan="` + col_count + `">
                                ` + GROUP_HEAD + `
                            </td>
                        </tr>`
                    );

                    last = group;
                }
            });
        }
    }

    createAjaxObj() {
        if (typeof (this._AJAX) != 'object') {
            this._SERVERSIDE = true;
            this._AJAX = {}
        }
    }

    checkIfAjax() {
        if (typeof (this._AJAX) == 'object') {
            return true;
        } else {
            return false;
        }
    }

    getAjax() {
        if (this.checkIfAjax() == true) {
            return {
                url: this._AJAX.URL || null,
                type: this._AJAX.METHOD || 'GET',
                data: this._AJAX.DATA || function (data) {
                    return data;
                },
                dataFilter: this._AJAX.DATAFILTER || function (data) {
                    var json = jQuery.parseJSON(data);
                    return JSON.stringify(json.data);
                }
            }
        } else {
            return null;
        }
    }

    render() {
        let DTOBJ = this;

        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            // return;
        }

        // Setting datatable defaults
        $.extend($.fn.dataTable.defaults, {
            autoWidth: DTOBJ._AUTOWIDTH,
            dom: DTOBJ._DOM,
            language: {
                search: DTOBJ._LANGUAGE.SEARCH.LABEL,
                searchPlaceholder: DTOBJ._LANGUAGE.SEARCH.PLACEHOLDER,
                lengthMenu: DTOBJ._LANGUAGE.LENGTHMENU,
                paginate: DTOBJ._LANGUAGE.PAGINATE
            }
        });

        $(window).resize(function () {
            let body_height = $(window).height();
            let div_position = $('.datatable-generated').offset().top;
            let final_height = body_height - div_position - 90;

            $(DTOBJ._DTSELECTOR).parent('div.dataTables_scrollBody').css({ height: final_height });

            $(DTOBJ._DTSELECTOR).DataTable().columns.adjust().draw('page');
        });

        $(".navbar-nav-link.sidebar-control").click(function () {
            $(DTOBJ._DTSELECTOR).DataTable().columns.adjust().draw('page');
        });


        let body_height = $(window).height();
        let div_position = $('.datatable-generated').offset().top;
        let final_height = body_height - div_position - 90;

        DTOBJ._TABLE = $(DTOBJ._DTSELECTOR).DataTable({
            "pageLength": DTOBJ._PGLENGTH,
            "processing": true, // DTOBJ._PROCESSING,
            "serverSide": DTOBJ._SERVERSIDE,

            "data": DTOBJ._DATA,

            "preDrawCallback": function (settings) {
                DTOBJ.blockCard();
            },

            "scrollY": (DTOBJ._SCROLLY == true) ? final_height : '',
            "scrollX": DTOBJ._SCROLLX,

            "fixedHeader": {
                "header": DTOBJ._FIXEDHEAD,
                "footer": DTOBJ._FIXEDFOOT
            },

            "bDestroy": true,
            "lengthMenu": DTOBJ._LENGTHMENU,
            "sorting": DTOBJ._SORTING,
            "ajax": DTOBJ.getAjax(),
            "initComplete": DTOBJ._INITCOMPLETE,
            "rowCallback": DTOBJ._ROWCALLBACK,
            "fnDrawCallback": DTOBJ._FNDRAWCALLBACK,
            "columns": (((DTOBJ._COLS).length > 0) ? (DTOBJ._COLS) : null)
        });

        if ($().select2) {
            let selector_select = $(DTOBJ._DTSELECTOR).closest('.dataTables_wrapper').children('.datatable-footer').find(".dataTables_length select");
            if(!selector_select.hasClass('select-sm')) {
                selector_select.addClass('select-sm');
            }

            if(!selector_select.data('select2')) {
                selector_select.select2({
                    minimumResultsForSearch: Infinity,
                    dropdownAutoWidth: true,
                    width: 'auto'
                });
            }
        }

        DTOBJ._TABLE.on('draw', function () {
            let curr_page_info = DTOBJ._TABLE.page.info();

            let oldpage = DTOBJ._CURRPAGE;
            let oldlength = DTOBJ._CURRLENGTH;

            if ((oldpage != curr_page_info.page) || (oldlength != curr_page_info.length)) {
                DTOBJ._CURRPAGE = curr_page_info.page;
                $('.dataTables_scrollBody').animate({ scrollTop: 0 }, 0);
            }

            return true;
        });
    }
}
export { DTable };