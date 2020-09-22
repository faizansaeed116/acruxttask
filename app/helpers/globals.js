module.exports = class Globals {

    constructor() {
        this.FORMATS = {
            DB: {}
        };
    }

    set ConfigData(CONFIGDATA) {
        this.CONFIG_DATA = CONFIGDATA;
    }

    set AccessControl(ACCESSCONTROL) {
        this.ACCESS_CONTROL = ACCESSCONTROL;
    }

    set DBConfig(DBCONFIG) {
        this.DB_CONFIG = DBCONFIG;
    }

    set FieldsMapping(FIELDSMAPPING) {
        this.FIELDS_MAPPING = FIELDSMAPPING;
    }

    set DefaultData(DEFAULTDATA) {
        this.DEFAULT_DATA = DEFAULTDATA;
    }

    get DefaultData() {
        return this.DEFAULT_DATA;
    }

    get DefaultData() {
        return this.DEFAULT_DATA;
    }

    ActiveDB() {
        let activeDB = (this.DB_CONFIG.DB).find(x => x.ACTIVE == true);
        return activeDB;
    }

    UpdateDBFormats() {
        let activeDB = this.ActiveDB();

        this.FORMATS.DB.DATETIME = activeDB.FORMATS.DATETIME;
        this.FORMATS.DB.DATE = activeDB.FORMATS.DATE;
        this.FORMATS.DB.TIME = activeDB.FORMATS.TIME;
    }

    AccessCodes(ROLE, TYPE) {
        let access_type = (this.ACCESS_CONTROL.ACCESS).find(x => x.TYPE == TYPE).CODES;
        let access_codes = access_type.find(x => x.ROLE == ROLE).STATES;
        return access_codes;
    }

    TableData(TTYPE) {
        let rawdata = fs.readFileSync('./app/config/' + TTYPE + '.json');
        let tdata = JSON.parse(rawdata);
        return tdata;
    }

    GetFieldsMapping(PAGE) {
        let fields = (this.FIELDS_MAPPING[PAGE]);

        return fields;
    }

    FormatRegulationID(PREFIX, ID, size = 6) {
        var s = ID + "";
        while (s.length < size) s = "0" + s;
        return PREFIX + s;
    }
}

// module.exports = Globals
