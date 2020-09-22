class DataTableColumns {
    constructor() {
        this.orderable = false;
        this.visible = true;
    }

    set TITLE(TITLE) {
        if (typeof TITLE != "undefined") {
            this.title = TITLE;
        }
    }

    set NAME(NAME) {
        if (typeof NAME != "undefined") {
            this.name = NAME;
        }
    }

    set DATA(DATA) {
        if (typeof DATA != "undefined") {
            this.data = DATA;
        }
    }

    set DEFAULT(DEFAULT) {
        if (typeof DEFAULT != "undefined") {
            this.defaultContent = DEFAULT;
        }
    }

    set CLASS(CLASS) {
        if (typeof CLASS != "undefined") {
            this.className = CLASS;
        }
    }

    set ORDER(ORDER) {
        if (typeof ORDER != "undefined") {
            this.orderable = ORDER;
        }
    }

    set RENDER(RENDER) {
        if (typeof RENDER != "undefined") {
            this.render = RENDER;
        }
    }

    set VISIBLE(VISIBLE) {
        if (typeof VISIBLE != "undefined") {
            this.visible = VISIBLE;
        }
    }
}

export { DataTableColumns };