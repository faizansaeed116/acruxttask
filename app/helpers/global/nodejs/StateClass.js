module.exports = class StateClass {

    constructor() {

        this._MSGS = {
            assessment_pending: '<span class="bg-transparent text-orange-300">Assessment Pending<span>',
            assessing: '<span class="bg-transparent text-blue-400">Assessing<span>',
            review_pending: '<span class="bg-transparent text-orange-300">Review Pending</span>',
            review_in_process: '<span class="bg-transparent text-blue-400">Review In Process</span>',
            reviewing: '<span class="bg-transparent text-orange-300">Reviewing</span>',
            approval_pending: '<span class="bg-transparent text-orange-300">Approval Pending</span>',
            approval_in_process: '<span class="bg-transparent text-blue-400">Approval In Process</span>',
            approved: '<span class="bg-transparent text-success">Approved</span>',
            rejected: '<span class="bg-transparent text-danger">Rejected</span>',
            review_rejection_pending: '<span class="bg-transparent text-orange-300">Review Rejection Pending</span>',
            review_rejection_in_process: '<span class="bg-transparent text-blue-400">Review Rejection In Process</span>',
            review_rejection_approved: '<span class="bg-transparent text-success">Review Rejection Approved</span>',
            review_rejection_rejected: '<span class="bg-transparent text-danger">Review Rejection Rejected</span>',
            review_approval_pending: '<span class="bg-transparent text-orange-300">Review Approval Pending</span>',
            review_approval_in_process: '<span class="bg-transparent text-blue-400">Review Approval In Process</span>',
            review_rejected: '<span class="bg-transparent text-danger">Review Rejected</span>',
            implementation_pending: '<span class="bg-transparent text-orange-300">Implementation Pending</span>',
            implementation_in_process: '<span class="bg-transparent text-blue-400">Implementation In Process</span>',
            implemented: '<span class="bg-transparent text-success">Implemented</span>'
        }

        this._DEFAULT_PHASES = {
            REG: {
                NAME: "Regulatory Assessment",
                ID: 1
            },
            RSK: {
                NAME: "Inherent Risk",
                ID: 2
            },
            CTL: {
                NAME: "Control Assessment",
                ID: 3
            },
            GAP: {
                NAME: "Gap Treatment Plan",
                ID: 4
            },
            KRI: {
                NAME: "KRI",
                ID: 5
            },
        }
    }
    set IS_RSK(IS_RSK) {
        this._IS_RSK = IS_RSK;
    }
    set REG_STATE(REG_STATE) {
        this._REG_STATE = REG_STATE;
    }

    set REG_DRAFT(REG_DRAFT) {
        this._REG_DRAFT = REG_DRAFT;
    }

    set RSK_STATE(RSK_STATE) {
        this._RSK_STATE = RSK_STATE;
    }

    set RSK_DRAFT(RSK_DRAFT) {
        this._RSK_DRAFT = RSK_DRAFT;
    }

    set CTL_STATE(CTL_STATE) {
        this._CTL_STATE = CTL_STATE;
    }

    set CTL_DRAFT(CTL_DRAFT) {
        this._CTL_DRAFT = CTL_DRAFT;
    }

    set CTL_AGODG(CTL_AGODG) {
        this._CTL_AGODG = CTL_AGODG;
    }

    set GAP_STATE(GAP_STATE) {
        this._GAP_STATE = GAP_STATE;
    }

    set GAP_DRAFT(GAP_DRAFT) {
        this._GAP_DRAFT = GAP_DRAFT;
    }

    set GAP_AGODG(GAP_AGODG) {
        this._GAP_AGODG = GAP_AGODG;
    }

    set TOTAL_DEPS_COUNT(TOTAL_DEPS_COUNT) {
        this._TOTAL_DEPS_COUNT = TOTAL_DEPS_COUNT;
    }

    set ISIMP_DEPS_COUNT(ISIMP_DEPS_COUNT) {
        this._ISIMP_DEPS_COUNT = ISIMP_DEPS_COUNT;
    }

    set KRI_STATE(KRI_STATE) {
        this._KRI_STATE = KRI_STATE;
    }

    set KRI_DRAFT(KRI_DRAFT) {
        this._KRI_DRAFT = KRI_DRAFT;
    }

    set CURR_USER_ROLL(CURR_USER_ROLL) {
        this._CURR_USER_ROLL = CURR_USER_ROLL;
    }

    set CURR_USER_DEP(CURR_USER_DEP) {
        this._CURR_USER_DEP = CURR_USER_DEP;
    }

    set PMY_DEP(PMY_DEP) {
        this._PMY_DEP = PMY_DEP;
    }

    set PMY_DEP_ID(PMY_DEP_ID) {
        this._PMY_DEP_ID = PMY_DEP_ID;
    }

    set IMP_DEP_ID(IMP_DEP_ID) {
        this._IMP_DEP_ID = IMP_DEP_ID;
    }

    set IMP_DEP(IMP_DEP) {
        this._IMP_DEP_ID = [];
        this._PMY_DEP = null;
        this._PMY_DEP_ID = null;

        this._IMP_DEP = IMP_DEP;

        (this._IMP_DEP).forEach(element => {
            if (element.ISIMP != 1) {
                (this._IMP_DEP_ID).push(element.DEPID);
            }

            if (element.ISPMY == 1) {
                this._PMY_DEP = element;
                this._PMY_DEP_ID = element.DEPID
            }
        });
    }

    calculate() {
        let editable_by = [];
        let dep_check_ispmy = false;
        let dep_check_all = false;

        if (this._REG_STATE == 4928 || this._REG_STATE == 'X') {
            /******* Regulation Approved *******/


            if (this._REG_STATE == 4928 && this._RSK_STATE == 'X') {
                // console.log("*********** Regulatory Assessment ***********");
                // console.log("****************** Approved ******************");

                this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
                this._STATE = this._REG_STATE;
                this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                this._CURRENT_STATUS = this._MSGS.approved;
            } else {
                // Checking Next Phase (Inherent Risk)
                if (this._RSK_STATE == 7177 || this._RSK_STATE == 'X') {
                    /******* Inherent Risk Approved *******/

                    if (this._RSK_STATE == 7177 && this._CTL_STATE == 'X') {
                        // console.log("*************** Inherent Risk ***************");
                        // console.log("****************** Approved ******************");

                        this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                        this._STATE = this._RSK_STATE;
                        this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                        this._CURRENT_STATUS = this._MSGS.approved;
                    } else {
                        // Checking Next Phase (Control Assessment)
                        if (this._CTL_STATE == 6901 || this._CTL_STATE == 'X') {

                            if (this._CTL_AGODG == 0 || (this._CTL_AGODG == null && this._CTL_STATE != 'X')) {

                                if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("********* Review Rejection Approved **********");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.review_rejection_approved;

                                } else if (this._CTL_DRAFT == 1) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("************** Assessing Control *************");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.assessing;

                                }

                                editable_by = [12];
                                dep_check_ispmy = true;

                            } else if (this._CTL_AGODG == 1 || this._CTL_STATE == 'X') {
                                /******* Control Assessment Approved *******/

                                if (this._CTL_STATE == 6901 && this._GAP_STATE == 'X') {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("****************** Approved ******************");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._CURRENT_STATUS = this._MSGS.approved;
                                } else {
                                    // Checking Next Phase (GAP Treatment Plan)
                                    if (this._GAP_STATE == 6341 || this._GAP_STATE == 'X') {

                                        if (this._GAP_AGODG == 0 || (this._GAP_AGODG == null && this._GAP_STATE != 'X')) {

                                            if (this._GAP_DRAFT == 0 || this._GAP_DRAFT == null) {

                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("********* Review Rejection Approved **********");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE;
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.review_rejection_approved;

                                            } else if (this._GAP_DRAFT == 1) {

                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("***************** Assessing ******************");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE;
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.assessing;

                                            }

                                            editable_by = [12];
                                            dep_check_ispmy = true;

                                        } else if (this._GAP_AGODG == 1 || this._GAP_STATE == 'X') {
                                            /******* Gap Treatment Plan Approved *******/

                                            // Check for Implementation Progress
                                            let imp_prog_per = 0;
                                            if (this._ISIMP_DEPS_COUNT != null && this._ISIMP_DEPS_COUNT != 0) {
                                                imp_prog_per = (this._ISIMP_DEPS_COUNT / this._TOTAL_DEPS_COUNT) * 100;
                                            }

                                            if (imp_prog_per == 0 && this._GAP_STATE != 'X') {

                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("*********** Implementation Pending ***********");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE;
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.implementation_pending;

                                                editable_by = [12];
                                                dep_check_ispmy = false;
                                                dep_check_all = true;

                                            } else if (imp_prog_per < 100 && this._GAP_STATE != 'X') {

                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("*************** Implementation ***************");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE;
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.implementation_in_process;

                                                editable_by = [12];
                                                dep_check_ispmy = false;
                                                dep_check_all = true;

                                            } else if (imp_prog_per == 100 || this._GAP_STATE == 'X') {
                                                /******* Gap Treatment Plan Implemented *******/

                                                if (this._GAP_STATE == 6341 && this._KRI_STATE == 'X') {
                                                    // console.log("************* GAP Treatment Plan *************");
                                                    // console.log("***************** Implemented *****************");
                                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                    this._STATE = this._GAP_STATE;
                                                    this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                    this._CURRENT_STATUS = this._MSGS.implemented;

                                                    editable_by = [12];
                                                    dep_check_ispmy = false;
                                                    dep_check_all = true;

                                                } else {

                                                    // Checking Next Phase (KRI)
                                                    if (this._KRI_STATE == 7889 || this._KRI_STATE == 'X') {
                                                        // console.log("******************** KRI ********************");
                                                        // console.log("****************** Approved ******************");

                                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                        this._STATE = this._KRI_STATE;
                                                        this._LAST_APPROVED = this._DEFAULT_PHASES.KRI.NAME;
                                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.KRI.ID;
                                                        this._CURRENT_STATUS = this._MSGS.approved;

                                                        editable_by = [];
                                                        dep_check_ispmy = false;

                                                    } else if (this._KRI_STATE == '' || this._KRI_STATE == null) {
                                                        // console.log("******************** KRI ********************");
                                                        // console.log("************ Assessment Pending *************");

                                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                        this._STATE = this._KRI_STATE;
                                                        this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                        this._CURRENT_STATUS = this._MSGS.assessment_pending;

                                                        editable_by = [3];
                                                        dep_check_ispmy = false;

                                                    } else if (this._KRI_STATE == 1351) {
                                                        // console.log("******************** KRI ********************");
                                                        // console.log("***************** Assessing *****************");

                                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                        this._STATE = this._KRI_STATE;
                                                        this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                        this._CURRENT_STATUS = this._MSGS.assessing;

                                                        editable_by = [3];
                                                        dep_check_ispmy = false;

                                                    } else if (this._KRI_STATE == 2556) {

                                                        if (this._KRI_DRAFT == 0 || this._KRI_DRAFT == null) {
                                                            // console.log("******************** KRI ********************");
                                                            // console.log("************** Approval Pending *************");

                                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                            this._STATE = this._KRI_STATE;
                                                            this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                            this._CURRENT_STATUS = this._MSGS.approval_pending;

                                                        } else if (this._KRI_DRAFT == 1) {
                                                            // console.log("******************** KRI ********************");
                                                            // console.log("************ Approval In Process ************");

                                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                            this._STATE = this._KRI_STATE;
                                                            this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                            this._CURRENT_STATUS = this._MSGS.approval_in_process;

                                                        }

                                                        editable_by = [1];
                                                        dep_check_ispmy = false;

                                                    } else if (this._KRI_STATE == 5141) {

                                                        if (this._KRI_DRAFT == 0 || this._KRI_DRAFT == null) {
                                                            // console.log("******************** KRI ********************");
                                                            // console.log("****************** Rejected *****************");

                                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                            this._STATE = this._KRI_STATE;
                                                            this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                            this._CURRENT_STATUS = this._MSGS.rejected;

                                                        } else if (this._KRI_DRAFT == 1) {
                                                            // console.log("******************** KRI ********************");
                                                            // console.log("***************** Assessing *****************");

                                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                            this._STATE = this._KRI_STATE;
                                                            this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                            this._CURRENT_STATUS = this._MSGS.assessing;

                                                        }

                                                        editable_by = [3];
                                                        dep_check_ispmy = false;

                                                    } else {
                                                        console.log("******************** KRI ********************");
                                                        console.log("****************** Unknown ******************");
                                                        console.log("KRI_STATE", this._KRI_STATE);
                                                        console.log("KRI_DRAFT", this._KRI_DRAFT);
                                                        console.log("*********************************************");

                                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.KRI.NAME;
                                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.KRI.ID;
                                                        this._STATE = this._REG_STATE;
                                                        this._LAST_APPROVED = this._DEFAULT_PHASES.GAP.NAME;
                                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.GAP.ID;
                                                        this._CURRENT_STATUS = "Unknown";

                                                        editable_by = [];
                                                        dep_check_ispmy = false;

                                                    }
                                                }
                                            }
                                        }

                                    } else if (this._GAP_STATE == '' || this._GAP_STATE == null) {

                                        // console.log("************* GAP Treatment Plan *************");
                                        // console.log("************* Assessment Pending *************");

                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                        this._STATE = this._GAP_STATE;
                                        this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                        this._CURRENT_STATUS = this._MSGS.assessment_pending;

                                        editable_by = [12];
                                        dep_check_ispmy = true;

                                    } else if (this._GAP_STATE == 1709) {

                                        // console.log("************* GAP Treatment Plan *************");
                                        // console.log("***************** Assessing ******************");

                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                        this._STATE = this._GAP_STATE;
                                        this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                        this._CURRENT_STATUS = this._MSGS.assessing;

                                        editable_by = [12];
                                        dep_check_ispmy = true;

                                    } else if (this._GAP_STATE == 5334) {

                                        if (this._GAP_DRAFT == 0 || this._GAP_DRAFT == null) {

                                            // console.log("************* GAP Treatment Plan *************");
                                            // console.log("************** Approval Pending **************");

                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                            this._STATE = this._GAP_STATE;
                                            this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                            this._CURRENT_STATUS = this._MSGS.approval_pending;

                                        } else if (this._GAP_DRAFT == 1) {

                                            // console.log("************* GAP Treatment Plan *************");
                                            // console.log("************* Approval In Process ************");

                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                            this._STATE = this._GAP_STATE;
                                            this._LAST_APPROVED = false;
                                            this._CURRENT_STATUS = this._MSGS.approval_in_process;
                                        }

                                        editable_by = [13];
                                        dep_check_ispmy = true;

                                    } else if (this._GAP_STATE == 6616) {

                                        if (this._GAP_DRAFT == 0 || this._GAP_DRAFT == null) {

                                            // console.log("************* GAP Treatment Plan *************");
                                            // console.log("*************** Review Pending ***************");

                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                            this._STATE = this._GAP_STATE;
                                            this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                            this._CURRENT_STATUS = this._MSGS.review_pending;

                                        } else if (this._GAP_DRAFT == 1) {

                                            // console.log("************* GAP Treatment Plan *************");
                                            // console.log("************** Review In Process *************");

                                            this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                            this._STATE = this._GAP_STATE;
                                            this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                            this._CURRENT_STATUS = this._MSGS.reviewing;

                                        }

                                        editable_by = [3];
                                        dep_check_ispmy = false;

                                    } else if (this._GAP_STATE == 8992) {
                                        if (this._GAP_DRAFT == 0) {
                                            if (this._GAP_AGODG == 1) {
                                                this._CURRENT_STATUS = this._MSGS.review_rejection_rejected;

                                            } else if (this._GAP_AGODG == 0) {
                                                this._CURRENT_STATUS = this._MSGS.review_rejection_approved;

                                            } else if (this._GAP_AGODG == null) {
                                                this._CURRENT_STATUS = this._MSGS.rejected;

                                            }
                                        } else {
                                            this._CURRENT_STATUS = this._MSGS.assessing;

                                        }
                                        // console.log("************* GAP Treatment Plan *************");
                                        // console.log("****************** Rejected ******************");

                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                        this._STATE = this._GAP_STATE
                                        this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;

                                        editable_by = [12];
                                        dep_check_ispmy = true;

                                    } else if (this._GAP_STATE == 5314) {

                                        if (this._GAP_AGODG == 0 || this._GAP_AGODG == null) {

                                            if (this._GAP_DRAFT == 0 || this._GAP_DRAFT == null) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("********* Review Rejection Pending **********");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.review_rejection_pending;
                                            } else if (this._GAP_DRAFT == 1) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("******** Review Rejection In Process *********");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.review_rejection_in_process;
                                            }

                                        } else if (this._GAP_AGODG == 1) {

                                            if (this._GAP_DRAFT == 0 || this._GAP_DRAFT == null) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("********* Review Approval Pending **********");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.review_approval_pending;
                                            } else if (this._GAP_DRAFT == 1) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("************* Approval In Process *************");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.review_approval_in_process;
                                            }

                                        }

                                        editable_by = [1];
                                        dep_check_ispmy = false;

                                    } else if (this._GAP_STATE == 7811) {

                                        if (this._GAP_AGODG == 0 || this._GAP_AGODG == null) {

                                            if (this._GAP_DRAFT == null || this._GAP_DRAFT == 0) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("************** Review Rejected ***************");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.review_rejection_rejected;

                                            } else if (this._GAP_DRAFT == 1) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("***************** Reviewing ******************");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.reviewing;
                                            }

                                        } else if (this._GAP_AGODG == 1) {

                                            if (this._GAP_DRAFT == null || this._GAP_DRAFT == 0) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("************** Review Rejected ***************");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.review_rejected;

                                            } else if (this._GAP_DRAFT == 1) {
                                                // console.log("************* GAP Treatment Plan *************");
                                                // console.log("***************** Reviewing ******************");

                                                this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                                this._STATE = this._GAP_STATE
                                                this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                                this._CURRENT_STATUS = this._MSGS.reviewing;
                                            }

                                        }

                                        editable_by = [3];
                                        dep_check_ispmy = false;

                                    } else {
                                        console.log("************* GAP Treatment Plan *************");
                                        console.log("****************** Unknown *******************");
                                        console.log("GAP_STATE", this._GAP_STATE);
                                        console.log("GAP_DRAFT", this._GAP_DRAFT);
                                        console.log("GAP_AGODG", this._GAP_AGODG);
                                        console.log("**********************************************");

                                        this._CURRENT_PHASE = this._DEFAULT_PHASES.GAP.NAME;
                                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.GAP.ID;
                                        this._STATE = this._CTL_STATE;
                                        this._LAST_APPROVED = this._DEFAULT_PHASES.CTL.NAME;
                                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.CTL.ID;
                                        this._CURRENT_STATUS = "Unknown";

                                        editable_by = [];
                                        dep_check_ispmy = false;
                                    }
                                }
                            }
                        } else if (this._CTL_STATE == '' || this._CTL_STATE == null) {
                            // console.log("************* Control Assessment *************");
                            // console.log("************* Assessment Pending *************");

                            this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                            this._STATE = this._CTL_STATE;
                            this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                            this._CURRENT_STATUS = this._MSGS.assessment_pending;

                            editable_by = [12];
                            dep_check_ispmy = true;

                        } else if (this._CTL_STATE == 1991) {
                            // console.log("************* Control Assessment *************");
                            // console.log("***************** Assessing ******************");

                            this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                            this._STATE = this._CTL_STATE;
                            this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                            this._CURRENT_STATUS = this._MSGS.assessing;

                            editable_by = [12];
                            dep_check_ispmy = true;

                        } else if (this._CTL_STATE == 4129) {

                            if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {
                                // console.log("************* Control Assessment *************");
                                // console.log("************** Approval Pending **************");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.approval_pending;

                            } else if (this._CTL_DRAFT == 1) {
                                // console.log("************* Control Assessment *************");
                                // console.log("************* Approval In Process ************");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.approval_in_process;
                            }

                            editable_by = [13];
                            dep_check_ispmy = true;

                        } else if (this._CTL_STATE == 6712) {

                            if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {
                                // console.log("************* Control Assessment *************");
                                // console.log("*************** Review Pending ***************");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.review_pending;

                            } else if (this._CTL_DRAFT == 1) {
                                // console.log("************* Control Assessment *************");
                                // console.log("************** Review In Process *************");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.reviewing;

                            }

                            editable_by = [3];
                            dep_check_ispmy = false;

                        } else if (this._CTL_STATE == 7122) {

                            if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {
                                // console.log("************* Control Assessment *************");
                                // console.log("****************** Rejected ******************");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.rejected;

                            } else if (this._CTL_DRAFT == 1) {
                                // console.log("************* Control Assessment *************");
                                // console.log("****************** Assessing ******************");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.assessing;

                            }

                            editable_by = [12];
                            dep_check_ispmy = true;

                        } else if (this._CTL_STATE == 5112) {

                            if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {

                                if (this._CTL_AGODG == 0 || this._CTL_AGODG == null) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("********** Review Rejection Pending **********");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.review_rejection_pending;

                                } else if (this._CTL_AGODG == 1) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("********** Review Approval Pending ***********");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.review_approval_pending;

                                }

                            } else if (this._CTL_DRAFT == 1) {
                                if (this._CTL_AGODG == 0 || this._CTL_AGODG == null) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("******** Review Rejection In Process *********");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.review_rejection_in_process;

                                } else if (this._CTL_AGODG == 1) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("********* Review Approval In Process *********");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.review_approval_in_process;

                                }
                            }

                            editable_by = [1];
                            dep_check_ispmy = false;

                        } else if (this._CTL_STATE == 7101) {
                            // Control Assessment
                            if (this._CTL_AGODG == 0 || this._CTL_AGODG == null) {

                                if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("********* Review Rejection Rejected **********");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.review_rejection_rejected;
                                } else if (this._CTL_DRAFT == 1) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("***************** Reviewing ******************");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.reviewing;
                                }

                            } else if (this._CTL_AGODG == 1) {

                                if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("************** Review Rejected ***************");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.review_rejected;
                                } else if (this._CTL_DRAFT == 1) {
                                    // console.log("************* Control Assessment *************");
                                    // console.log("***************** Reviewing ******************");

                                    this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                    this._STATE = this._CTL_STATE;
                                    this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                    this._CURRENT_STATUS = this._MSGS.reviewing;
                                }
                            }

                            editable_by = [3];
                            dep_check_ispmy = false;

                        } else if (this._CTL_STATE == 7111) {

                            if (this._CTL_DRAFT == 0 || this._CTL_DRAFT == null) {

                                // console.log("************* Control Assessment *************");
                                // console.log("********* Review Rejection Approved **********");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.review_rejection_approved;

                            } else if (this._CTL_DRAFT == 1) {

                                // console.log("************* Control Assessment *************");
                                // console.log("****************** Assessing ******************");

                                this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                                this._STATE = this._CTL_STATE;
                                this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                                this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                                this._CURRENT_STATUS = this._MSGS.assessing;

                            }

                            editable_by = [12];
                            dep_check_ispmy = true;

                        } else {
                            console.log("************* Control Assessment *************");
                            console.log("****************** Unknown *******************");
                            console.log("CTL_STATE", this._CTL_STATE);
                            console.log("CTL_DRAFT", this._CTL_DRAFT);
                            console.log("CTL_AGODG", this._CTL_AGODG);
                            console.log("**********************************************");

                            this._CURRENT_PHASE = this._DEFAULT_PHASES.CTL.NAME;
                            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.CTL.ID;
                            this._STATE = this._CTL_STATE;
                            this._LAST_APPROVED = this._DEFAULT_PHASES.RSK.NAME;
                            this._LAST_APPROVED_ID = this._DEFAULT_PHASES.RSK.ID;
                            this._CURRENT_STATUS = "Unknown";

                            editable_by = [];
                            dep_check_ispmy = false;
                        }
                    }

                } else if (this._RSK_STATE == '' || this._RSK_STATE == null) {
                    // console.log("*************** Inherent Risk ***************");
                    // console.log("************ Assessment Pending *************");

                    // Inherent Risk
                    if (this._IS_RSK == 0) {
                        this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
                        this._STATE = this._RSK_STATE;
                        this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                        this._CURRENT_STATUS = this._MSGS.approved;

                        editable_by = [];
                        dep_check_ispmy = false;
                    }
                    else {
                        this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                        this._STATE = this._RSK_STATE;
                        this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                        this._CURRENT_STATUS = this._MSGS.assessment_pending;

                        editable_by = [3];
                        dep_check_ispmy = false;
                    }

                } else if (this._RSK_STATE == 1101) {
                    // console.log("*************** Inherent Risk ***************");
                    // console.log("************** Assessing Risk ***************");

                    this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                    this._STATE = this._RSK_STATE;
                    this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                    this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                    this._CURRENT_STATUS = this._MSGS.assessing;

                    editable_by = [3];
                    dep_check_ispmy = false;

                } else if (this._RSK_STATE == 2314) {

                    if (this._RSK_DRAFT == 0 || this._RSK_DRAFT == null) {
                        // console.log("*************** Inherent Risk ***************");
                        // console.log("************** Approval Pending *************");

                        this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                        this._STATE = this._RSK_STATE;
                        this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                        this._CURRENT_STATUS = this._MSGS.approval_pending;

                    } else if (this._RSK_DRAFT == 1) {
                        // console.log("*************** Inherent Risk ***************");
                        // console.log("************ Approval In Process ************");

                        this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                        this._STATE = this._RSK_STATE;
                        this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                        this._CURRENT_STATUS = this._MSGS.approval_in_process;

                    }

                    editable_by = [1];
                    dep_check_ispmy = false;

                } else if (this._RSK_STATE == 9811) {

                    if (this._RSK_DRAFT == 0 || this._RSK_DRAFT == null) {
                        // console.log("*************** Inherent Risk ***************");
                        // console.log("****************** Rejected *****************");

                        this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                        this._STATE = this._RSK_STATE;
                        this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                        this._CURRENT_STATUS = this._MSGS.rejected;
                    } else if (this._RSK_DRAFT == 1) {
                        // console.log("*************** Inherent Risk ***************");
                        // console.log("****************** Assessing *****************");

                        this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                        this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                        this._STATE = this._RSK_STATE;
                        this._LAST_APPROVED = this._DEFAULT_PHASES.REG.NAME;
                        this._LAST_APPROVED_ID = this._DEFAULT_PHASES.REG.ID;
                        this._CURRENT_STATUS = this._MSGS.assessing;
                    }

                    editable_by = [3];
                    dep_check_ispmy = false;

                } else {
                    console.log("*************** Inherent Risk ***************");
                    console.log("****************** Unknown ******************");
                    console.log("RSK_STATE", this._RSK_STATE);
                    console.log("RSK_DRAFT", this._RSK_DRAFT);
                    console.log("*********************************************");

                    this._CURRENT_PHASE = this._DEFAULT_PHASES.RSK.NAME;
                    this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.RSK.ID;
                    this._STATE = this._RSK_STATE;
                    this._LAST_APPROVED = false;
                    this._CURRENT_STATUS = "Unknown";

                    editable_by = [];
                    dep_check_ispmy = false;
                }
            }

        } else if (this._REG_STATE == 1010) {
            // console.log("*********** Regulatory Assessment ***********");
            // console.log("***************** Assessing *****************");

            this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
            this._STATE = this._REG_STATE;
            this._LAST_APPROVED = false;
            this._LAST_APPROVED_ID = false;
            this._CURRENT_STATUS = this._MSGS.assessing;

            editable_by = [3];
            dep_check_ispmy = false;

        } else if (this._REG_STATE == 1391) {

            if (this._REG_DRAFT == null || this._REG_DRAFT == 0) {
                // console.log("*********** Regulatory Assessment ***********");
                // console.log("****** Submitted and Pending Approval *******");

                this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
                this._STATE = this._REG_STATE;
                this._LAST_APPROVED = false;
                this._LAST_APPROVED_ID = false;
                this._CURRENT_STATUS = this._MSGS.approval_pending;

            } else if (this._REG_DRAFT == 1) {
                // console.log("*********** Regulatory Assessment ***********");
                // console.log("***** Submitted and Approval In Process *****");

                this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
                this._STATE = this._REG_STATE;
                this._LAST_APPROVED = false;
                this._LAST_APPROVED_ID = false;
                this._CURRENT_STATUS = this._MSGS.approval_in_process;

            }

            editable_by = [1];
            dep_check_ispmy = false;

        } else if (this._REG_STATE == 9399) {

            if (this._REG_DRAFT == null || this._REG_DRAFT == 0) {
                // console.log("*********** Regulatory Assessment ***********");
                // console.log("****************** Rejected *****************");

                this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
                this._STATE = this._REG_STATE;
                this._LAST_APPROVED = false;
                this._LAST_APPROVED_ID = false;
                this._CURRENT_STATUS = this._MSGS.rejected;
            } else if (this._REG_DRAFT == 1) {
                // console.log("*********** Regulatory Assessment ***********");
                // console.log("****************** Assessing *****************");

                this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
                this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
                this._STATE = this._REG_STATE;
                this._LAST_APPROVED = false;
                this._LAST_APPROVED_ID = false;
                this._CURRENT_STATUS = this._MSGS.assessing;
            }

            editable_by = [3];
            dep_check_ispmy = false;

        } else {
            console.log("*********** Regulatory Assessment ***********");
            console.log("****************** Unknown ******************");
            console.log("REG_STATE", this._REG_STATE);
            console.log("REG_DRAFT", this._REG_DRAFT);
            console.log("*********************************************");

            this._CURRENT_PHASE = this._DEFAULT_PHASES.REG.NAME;
            this._CURRENT_PHASE_ID = this._DEFAULT_PHASES.REG.ID;
            this._STATE = this._REG_STATE;
            this._LAST_APPROVED = false;
            this._LAST_APPROVED_ID = false;
            this._CURRENT_STATUS = "Unknown";

            editable_by = [];
            dep_check_ispmy = false;

        }

        if (editable_by.includes(this._CURR_USER_ROLL)) {
            if (dep_check_ispmy == true) {
                if (this._PMY_DEP_ID == this._CURR_USER_DEP) {
                    this._EDITABLE = true;
                } else {
                    this._EDITABLE = false;
                }
            } else if (dep_check_all == true) {
                if ((this._IMP_DEP_ID).includes(this._CURR_USER_DEP)) {
                    this._EDITABLE = true;
                } else {
                    this._EDITABLE = false;
                }
            } else {
                this._EDITABLE = true;
            }
        } else {
            this._EDITABLE = false;
        }
    }

    get CURRENT_STATUS() {
        return this._CURRENT_STATUS;
    }

    get CURRENT_PHASE() {
        return this._CURRENT_PHASE;
    }

    get CURRENT_PHASE_ID() {
        return this._CURRENT_PHASE_ID;
    }

    get LAST_APPROVED() {
        return this._LAST_APPROVED
    }

    get LAST_APPROVED_ID() {
        return this._LAST_APPROVED_ID
    }

    get CURR_EDIT_STATE() {
        return this._EDITABLE;
    }
}