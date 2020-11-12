type DETAIL = {
	mothersname: string;
	cdistrict: string;
	academicyear: string;
	gender: string;
	cstatename: string;
	scellno: string;
	admissionyear: string;
	ccityname: string;
	ppin: number;
	programdesc: string;
	pdistrict: string;
	sectioncode: string;
	enrollmentno: string;
	parentoccupation: string;
	branchdesc: string;
	ptelephoneno: string;
	dateofbirth: string; // dd/mm/yyyy
	semailid: string;
	paddress1: string;
	paddress2: string;
	paddress3: null;
	pemailid: string;
	pcityname: string;
	stelephoneno: string;
	stynumber: 4;
	caddress3: null;
	bloodgroup: string;
	caddress1: string;
	caddress2: string;
	nationality: string;
	maritalstatus: string;
	pstatename: string;
	fathersname: string;
	accountno: string;
	name: string;
	pcellno: string;
	bankname: string;
	category: string;
	cpin: number;
};

type EDUCATION = {
	passingyear: number;
	division: string;
	qualification: string;
	percentageofmarks: number;
	grade: string;
	marksobtained: number;
	maxmarks: number;
	boardname: string;
};

export type ATTENDANCE = {
	stynumber: number;
	TotalAttandence: number;
	Latt: string;
	Patt: string;
	subject: string;
	Tatt: string;
	subjectcode: string;
	lastupdatedon: string;
};

export type MYDETAIL = {
	detail: DETAIL[];
	griddata: EDUCATION[];
};

export type RESULT = {
	stynumber: number;
	fail: string;
	examperiodfrom: string;
	sgpaR: string;
	Semesterdesc: string;
	holdprocessing: string;
	deactive: string;
	totalearnedcredit: string;
};

export type DETAIL_RESULT = {
	stynumber: number;
	subjectcode: string;
	earnedcredit: number;
	subjectdesc: string;
	grade: string;
};
