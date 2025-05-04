const { createClient } = require('@supabase/supabase-js');
const { supabaseConfig } = require('../../../lib/supabaseConfig');

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

const schemes = [
  {
    id: "1",
    title: "Agricultural Infrastructure Fund",
    description: "1. Aim: Develop farm-gate & post-harvest infrastructure for better utilization & value addition.\n2. This scheme provides loans only for construction and machinery purchases.\n3. The project will run until 2032-33 financial year, with the goal of modernizing agriculture infrastructure.\n4. Minimum Contribution required: The promoter or entrepreneur should contribute the 10% cost of the project for example if the project cost is 50 lakh then the candidate should contribute 5 lakh",
    eligibility_criteria: "1. Start-ups\n2. PACS(Primary Agricultural Credit Society\n3. Farmers and Agri Entrepreneurs\n4. APMC's(Agricultural Produce Market Committee)\n5. Groups { SHG's(Self Help Groups), FPO's (Farmers Producers Organization )}.",
    benefits: "1. Those who are eligible for this scheme they can take loan up to 2cr\n2. They will get interest subsidy of 3% and the maximum interest rate is 9%\n3. The maximum interest for any amount will be less than or equal to 9%. The maximum loan repayment tenure is 7 years and there will be moratorium period (EMI holiday) of 6 months to 2 year depending on the project.\n4. The maximum number of projects that can be taken are 25 and each of such projects will be eligible under the scheme for loan up-to ₹ 2 crore.",
    application_process: "1. Contact the bank and take consent from them.\n2. Apply through AIF portal (https://agriinfra.dac.gov.in/)\n3. After registered in the portal the is sent to PMU(Program Management Unit)\n4. Loan and Subsidy Disbursal will be provided",
    category: "Agriculture",
    video_url: "https://3final3.s3.eu-north-1.amazonaws.com/PKKKY_final.mp4"
  },
  {
    id: "2",
    title: "Prakritik Kheti Khushhal Kisan Yojana",
    description: "1. This scheme is launched to promote the agriculture through non-chemical, low cost, climate resilient and environment friendly Natural farming(promotes the use of cow dung and cow urine).\n2. Aims to increase farmers income with low-investment techniques (Encorages Zero-budget natural farming to reduce farming).\n3. Provides the training and technical support to farmers.\n4. Supports the marketing of organic produce at premimum prices.",
    eligibility_criteria: "Farmers:\na) Should be resident of HP and engaged in agriculture.\nb) Small, marginal, and medium-scale farmers are prioritized.\nc) Cooperative farmer groups can apply for cluster based benefits",
    benefits: "1. Women Farmers and SC/ST farmers receive additional benefits.\n2. Preference given to those willing to adopt 100% organic farming.\n3. Financial assistence maximum upto Rs. 8000/- per natural farming is being provided for lining cattle sheds which would facilitate collection of cow dung.\n4. A subsidy of 50% is being provided for the purchase of desi cow limited to Rs. 25,000/- and additional Rs. 5000/- for the trasportation purpose.",
    application_process: "1. Go to the Portal:\n2. Visit: https://naturalfarming.hp.gov.in/\n3. Fill in the Registration Form",
    category: "Agriculture",
    video_url: "https://3final3.s3.eu-north-1.amazonaws.com/PKKKY_final.mp4"
  },
  {
    id: "3",
    title: "Flow Irrigation Scheme",
    description: "1. Designed to provide irrigation support in hilly and sloped terrains of Himachal Pradesh\n2. Government has decided to grant 50 percent subsidy for construction of bore wells and shallow for individual for irrigation purposes under the scheme\n3. A fund of rs. 15.00 crore was spent during financial year 2022-23 covering an area of 600 hectares benefiting 820 numbers of farmers.\n4. A budget provision of rs .8.00 crores have been made under the scheme for fy 2023-24",
    eligibility_criteria: "1. Applicants must be permanent residents of himachal pradesh\n2. Farmers should own agricultural land with in state\n3. Both indiviual farmers and group (such as water User Associations) are eligible.",
    benefits: "1. Up to 100% subsidy for small/marginal farmers.\n2. Irrigation to dry and remote farm areas.\n3. Encourages multiple cropping.\n4. Improves water use efficiency.",
    application_process: "1. Apply at the nearest Agriculture Department office.\n2. Submit land documents, Aadhaar, and water need statement.\n3. On-site survey and technical assessment.\n4. Project execution with financial support.\n5. Subsidy released post-completion.\nVisit: https://himachalforms.nic.in/panchayati-raj/yojanas.html",
    category: "Agriculture",
    video_url: "https://3final3.s3.eu-north-1.amazonaws.com/FIS_final.mp4"
  },
  {
    id: "4",
    title: "Rajya Krishi Yantrikaran Programme",
    description: "1. Aimed to modernize agriculture through mechanization.\n2. Provides financial aid for purchase of farm machinery.\n3. A budget provision Rs.10.00 cr has been kept by the state government for implementation of this scheme during financial year 2023-24\n4. Supports individuals and Farmer Producer Organizations (FPOs).\n5. Encourages group-based machinery hiring for small farmers.",
    eligibility_criteria: "1. All registered farmers in HP.\n2. SC/ST and marginal farmers get priority.\n3. Farmer groups/cooperatives also eligible.",
    benefits: "1. 40–80% subsidy on machines like power tillers, weeders, etc.\n2. Availability of Custom Hiring Centres (CHCs).\n3. Easy access to modern equipment.\n4. Lowers long-term costs for farmers.",
    application_process: "1. Visit: https://himachalforms.nic.in/panchayati-raj/yojanas.html\n2. Visit your Block Agriculture Office.\n3. Submit Aadhaar, land, and bank details.\n4. Deposit your share; collect machine post-verification.\n5. CHCs can be approached if not buying directly.",
    category: "Agriculture",
    video_url: "https://3final3.s3.eu-north-1.amazonaws.com/FIS_final.mp4"
  },
  {
    id: "5",
    title: "NSAP - Indira Gandhi National Old Age Pension Scheme",
    description: "IGNOAPS provides monthly pensions to BPL citizens aged 60 years and above. Pension amount: ₹200 (60–79 years) and ₹500 (80+ years). Part of the National Social Assistance Programme (NSAP) launched on 15th August 1995. Targets destitute individuals with little or no income in rural and urban areas. NSAP fulfils Directive Principles of State Policy by promoting welfare and livelihood support.",
    benefits: "A monthly pension of ₹ 200 up to 79 years and ₹ 500 thereafter.",
    eligibility_criteria: "The applicant should be a citizen of India.\nThe applicant should be living Below Poverty Line.\nThe applicant should be at least 60 years of age.",
    application_process: "1. Download UMANG App or visit website https://web.umang.gov.in/web_new/home\n2. Login using mobile number and OTP\n3. Search for NSAP\n4. Click on 'Apply Online'\n5. Fill the basic details, choose the mode of payment of pension, upload photo and click on 'Submit'",
    category: "Banking",
    video_url: ""
  },
  {
    id: "6",
    title: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    description: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) is a life insurance scheme covering death from any cause. It provides one-year insurance, which you can renew every year. The scheme is available through banks and post offices, handled by life insurance companies. Anyone aged 18 to 50 years with a bank or post office account can join. It's an easy and affordable way to get life insurance protection.",
    benefits: "PMJJBY offers one-year term life cover of ₹ 2.00 Lakh to all the subscribers in the age group of 18-50 years.\nIt covers death due to any reason.\nPremium payable is ₹ 436/- per annum per subscriber, to be auto debited from the subscriber's bank/post office account.",
    eligibility_criteria: "The age of the applicant must be between 18 to 50 Years.\nThe applicant must hold an individual bank / post office account.",
    application_process: "1. Download and take print of the 'CONSENT-CUM-DECLARATION FORM' from: https://www.jansuraksha.gov.in/Files/PMJJBY/English/ApplicationForm.pdf\n2. Duly fill and sign the application form\n3. Attach the self-attested copies of the required documents\n4. Submit the case to the authorised official of Bank / Post Office\n5. The official will return you the 'ACKNOWLEDGEMENT SLIP CUM CERTIFICATE OF INSURANCE'",
    category: "Banking",
    video_url: ""
  },
  {
    id: "7",
    title: "Atal Beemit Vyakti Kalyan Yojana",
    description: "It gives cash relief to insured workers who become unemployed. The cash amount is 50% of their average daily earnings, for a maximum of 90 days. To get benefits, the person must have at least 2 years of insured work. They must have worked at least 78 days in each of the last three contribution periods before claiming.",
    benefits: "The scheme gives 50% of the last average daily earnings during unemployment, for up to 90 days (only once in a lifetime).\nThe employee must have at least 2 years of insured work and contributed 78 days in the period just before unemployment and in one more period within the last two years.\nMedical benefits under the ESIC Act are also available during the relief period.\nThe claim becomes due after 30 days of unemployment (earlier it was 90 days).",
    eligibility_criteria: "The insured person must have been unemployed, with at least 2 years of insurable work and 78 days' contribution in each of the last three periods.\nEmployer's contribution should be paid/payable, and unemployment must not be due to misconduct, retirement, or voluntary resignation.\nAadhaar and bank account must be linked to the ESIC database.",
    application_process: "1. Visit the ESIC website (https://esic.gov.in/)\n2. Sign up by providing your Insurance Number, Date of Birth, and Mobile Number to create a usertitle and password\n3. Log in and select the scheme to claim benefits\n4. Complete the application form, upload necessary documents like the AB-1 Form and Aadhaar Card\n5. Submit the claim and take printouts of the claim and the generated employer letter\n6. Submit to the employer\n7. The Branch Office staff will verify the claim, calculate eligibility, and the relief amount\n8. Payment will be made to the applicant's bank account",
    category: "Banking",
    video_url: ""
  },
  {
    id: "8",
    title: "Prime Minister's Employment Generation Programme",
    description: "PMEGP, launched in 2008, helps create jobs by setting up small businesses in rural and urban areas. The scheme is extended for 5 years (2021-2026) with ₹13,554.42 crore to set up 4,00,000 projects and create 30 lakh jobs. It was created by merging two old schemes, PMRY and REGP. Every year, 1,000 units will be upgraded, creating about 8 jobs per unit.",
    benefits: "Margin Money Subsidy: Funds are allocated for new micro-enterprises and upgrading existing units. ₹100 Crores is set aside each year for upgrading PMEGP/REGP/MUDRA units.\nSupport for New Units: For new enterprises, general category beneficiaries get 15% subsidy in urban areas and 25% in rural areas, while special category beneficiaries get higher subsidies (25% in urban and 35% in rural areas).\nBank Loan Support: Beneficiaries must contribute a percentage of the project cost, and banks provide the rest. If costs exceed subsidy limits, the extra amount will be covered by the bank without government support.",
    eligibility_criteria: "Any individual above 18 years can apply. For projects over ₹10 lakh (Manufacturing) or ₹5 lakh (Business/Service), the applicant must have at least an VIII standard education. Existing units or those receiving government subsidies are not eligible.\nFor upgradation, the unit must have repaid the first loan, completed the 3-year lock-in period, and show profits with potential for growth after upgrading.\nPriority: Preference will be given to people affected by natural disasters, as declared under the Disaster Management Act.",
    application_process: "New Unit Application:\n1. Visit the PMEGP portal\n2. Click on 'Apply' under 'Application For New Unit'\n3. Fill in the required details\n4. Upload documents\n5. Submit\n\nExisting Unit Application (2nd Loan):\n1. Visit the portal\n2. Click on 'Apply' under 'Existing Units (2nd Loan)'\n3. Complete the form\n4. Upload documents\n5. Submit\n\nLogin for Registered Applicants (Second Loan):\n1. Visit the portal\n2. Enter your User ID and Password\n3. Log in to proceed",
    category: "Banking",
    video_url: ""
  },
  {
    id: "9",
    title: "Biotechnology Ignition Grant Scheme",
    description: "Purpose: 1. Supports biotech startups and innovators from idea stage to Proof of Concept (PoC), aiming to create commercially viable technologies.\n 2. Focus Areas: Covers biotech innovations in healthcare, agriculture, clean energy, waste management, etc., encouraging integration with AI, IoT, robotics, and other applied sciences.\n 3. Limitations & Duration: Does not support basic research or academic projects; funding is milestone-based for up to 18 months.",
    benefits: "1.Funding: Grant-in-aid of up to INR 50 lakhs for a project duration of 18 months.\n 2. Technical Mentoring: Support from experts in tech, IP, and regulatory domains.\n 3. Business Support: Help with legal guidance, business mentoring, and investor connections.\n 4. Capacity Building: Includes training, networking, and outreach opportunities",
    eligibility_criteria: "1. Individual must be an Indian citizen and incubated at a recognized incubator.\n 2. If employed, NOC or resignation proof is needed before grant approval.\n 3. Companies/LLPs must be Indian-registered (≤5 years old), 51% Indian-owned, with in-house R&D or incubation.\n 4. Project Leader must be technically qualified and a shareholder; BIG grant is one-time only.",
    application_process: "1. Application Submission: Applications for the BIG scheme must be submitted online through the BIRAC website during the national call periods (Jan 1 & July 1).\n 2. Eligibility and Evaluation: Applications go through an eligibility check, PSC examination, online review by experts, and a presentation before the Technical Expert Panel (TEP).\n 3. Final Selection: The Expert Selection Committee (ESC) sets a cut-off score for final selection, followed by due diligence by BIG Partners.\n 4. Evaluation Criteria: Proposals are evaluated based on unmet need, technical viability, team strength, and commercialization potential.",
    category: "Business",
    video_url: ""
  },
  {
  id: "10",
    title: "Prime Minister's Employment Generation Programme",
    description: "1. Objective: PMEGP aims to generate employment by establishing micro-enterprises in rural and urban areas, creating self-employment opportunities and reducing migration.\n 2.Implementation: The scheme is implemented at the national level by the Khadi and Village Industries Commission (KVIC) and at the state level through various agencies such as KVIBs, DICs, and Banks.",
    benefits: "1. Margin Money Subsidy: Annual funds for new units and ₹100 Crores for upgrading existing ones.\n 2.Backward & Forward Linkages: 5% of funds for activities like awareness, training, and monitoring.",
    eligibility_criteria: "1. Eligibility for New Enterprises: Individuals above 18 years, with no income ceiling, and educational qualification of at least VIII standard for projects over ₹10 lakh (Manufacturing) or ₹5 lakh (Business/Service).\n2. Upgradation Criteria: Existing units must have repaid their first loan, have a good turnover, and complete a 3-year lock-in period before claiming Margin Money.\n 3. Priority: Preference will be given to those affected by natural calamities in disaster-declared areas.",
    application_process: "1.	In Offline\n• Fill the complete form: https://www.kviconline.gov.in/pmegpeportal/dashboard/notification/Drfat%20signed.pdf\n•Filled original form shall be submitted to the concerned KVIC/KVIB/DIC/Coir Board Officers of State.\n •On submission, the applicant shall receive the Acknowledgement Slip from the department of concerned KVIC/KVIB/DIC/Coir Board Office.\n\n2.	In Online\n•	New Unit Application: Visit the PMEGP portal, fill in details, upload documents, and submit.\n•	Existing Unit (2nd Loan): Visit the portal, complete the form, upload documents, and submit.\n•	Login for 2nd Loan Applicants: Enter User ID and Password on the PMEGP portal to log in.\n•	Incubation Scheme",
    category: "Business",
    video_url: ""
  },
  {
    id: "11",
    title: "Incubation Scheme",
    description: "•	Host Institutes (HIs): Eligible institutions are recognized as business incubators to support MSMEs.\n•	Idea Approval: Ideas from incubatees submitted through Host Institutes are evaluated and approved.\n•	Support for MSMEs: Provides capital support and assistance in nurturing ideas, including plant and machinery for expansion.",

    benefits: "•	Up to maximum of ₹ 15,000,00 /-per idea shall be provided to HI for developing and nurturing the ideas.\n•	Up to ₹ 1,00,000,00 /- (max) shall be provided to HI for procurement and installation of relevant plant and machines including hardware and software etc. in BI for R&D activities and common facilities for incubatees of BI.",

    eligibility_criteria: "•	Institutions such as Technical Colleges, Universities, other Professional Colleges/Institutes, R&D Institutes, NGOs involved in incubation activities, MSME-DIs/ Technology Centres or any Institute/Organization of Central/State Government.",
    application_process: "•	Registration: Open the website( https://my.msme.gov.in/inc/ ), click the REGISTRATION button, fill in details, and submit. A success message will appear after submission.\n•	HI/BI Application: Log in to the dashboard, click `Apply for HI/BI Approval,` fill in the application details, and click submit.•	Final Submission: After completing the application, click on the Final Submit button to complete the process for HI/BI approval.",
    category: "Business",
    video_url: ""
  },

      {
        id: 12,
        title: "Medha Prostahan Yojana",
        description: 
          "Provides financial aid to meritorious students for coaching classes.\n,Focuses on exams like NEET, JEE, NDA, UPSC, and allied services.\n,Covers both online and offline coaching formats.\nTargets 350 top students after 10+2 and 150 graduates.\nPromotes success in professional and competitive examinations."
        ,
        eligibility_criteria: 
          "Must be a Bonafide Himachal student\nTop 350 students from 10+2 streams (Science-200, Commerce-75, Arts-75).\n150 meritorious graduates preparing for government services.\nMust be enrolled in recognized coaching institutes.\nNo age restriction specified."
        ,
        benefits: 
          "Financial aid up to Rs. 1 lakh.\nApplicable for both online and offline coaching.\nCovers various competitive exams.\nBudget provision of Rs. 5 crore.\nSupport for students aiming for professional and government sectors."
        ,
        application_process: 
          "Visit the Department of Higher Education, Himachal Pradesh website.\nFill out the application form.\nAttach necessary documents like certificates and Bonafide certificate.\nSubmit the application before the deadline.\nWait for confirmation and further instructions."
        ,
        category: "Education",
        video_url: ""
      },
      {
        id: 13,
        title: "Swami Vivekananda Utkrisht Chhatravriti Yojna",
        description: 
          "Scholarship for general category meritorious students post-matric.\nBeneficiaries are top 2000 students from Class 10.\nSupports students enrolled in Class 11 and technical courses.\nEncourages higher and professional education.\nScholarship aimed at reducing financial burdens."
        ,
        eligibility_criteria: 
          "Must be a Bonafide Himachal.\nMust belong to the general category.\nMust be among the top 2000 merit holders of Class 10.\nEnrolled in Class 11 or professional/technical courses.\nStudying in recognized institutions."
        ,
        benefits: 
          "Rs. 18,000 per annum.\nScholarship for two successive years.\nDirect transfer to student's bank account.\nEncourages higher education among general category students.\nNo application fee."
        ,
        application_process: 
          "Register on the National Scholarship Portal (NSP).\nFill out the application form.\nUpload necessary documents (Aadhaar, Bonafide Certificate, academic records)\nSubmit the application online.\nTrack status on the NSP dashboard."
        ,
        category: "Education",
        video_url: ""
      },
      {
        id: 14,
        title: "Mukhya Mantri Vidyarthi Kalyan Yojana",
        description: 
          "Scholarship for students from IRDP/BPL families.\nCovers studies from Class 9 till university level.\nApplicable only in government or government-aided institutions.\nProvides monthly disbursement of scholarships.\nSupports financially weaker sections in continuing education."
        ,
        eligibility_criteria: 
          "Must be a Bonafide Himachal.\nBelong to IRDP/BPL families.\nStudying from Class 9 to university level.\nEnrolled in government or government-aided institutions.\nMust have a bank account."
        ,
        benefits: 
          "Class 9 & 10: Rs. 300/year (boys), Rs. 600/year (girls).\nClass 11 & 12: Rs. 800/year for both boys and girls.\nCollege/University Day Scholars: Rs. 1,200/year.\nCollege/University Hostelers: Rs. 2,400/year.\nScholarships disbursed monthly."
        ,
        application_process: 
          "Register on the NSP.\nFill in the application form.\nUpload required documents (Bonafide, IRDP/BPL certificate, academic documents).\nSubmit the application online.\nTrack the application through the NSP."
        ,
        category: "Education",
        video_url: ""
      },
      {
        id: 15,
        title: "Dr. Y.S. Parmar Vidyarthi Rin Yojna",
        description: 
          "Education loan interest subsidy scheme.\nTargeted at Himachal students pursuing higher education.\nCovers loans from scheduled banks.\nFocuses on UGC/AICTE approved courses.\nMinimizes financial burden during studies."
        ,
        eligibility_criteria: 
          "Must be a Bonafide Himachal.\nStudents with sanctioned education loans from scheduled banks.\nMust be pursuing recognized courses by UGC/AICTE.\nNo loan repayment default.\nHigher education courses covered."
        ,
        benefits: 
          "Interest subsidy on education loans.\nReduces financial burden during the course.\nEncourages pursuing higher education.\nApplicable throughout the course duration.\nBoth undergraduate and postgraduate studies covered."
        ,
        application_process: 
          "Download application form from Directorate of Higher Education website.\nFill out form carefully with loan and personal details.\nAttach loan sanction letter and academic records.\nSubmit to Directorate of Higher Education\nAwait confirmation."
        ,
        category: "Education",
        video_url: ""
      },
      {
        id: 16,
        title: "Post-Matric Scholarship Scheme for ST Students",
        description: 
          "Financial support for Scheduled Tribe students post-matriculation.\nCovers Class 11 to postgraduate studies.\nFocuses on both academic and professional courses.\nFamily income should be below Rs. 2.5 lakh.\nBoosts educational participation of ST category."
        ,
        eligibility_criteria: 
          "Must be a Bonafide Himachal.\nBelong to ST category.\nStudying from Class 11 to postgraduate level.\nFamily income less than Rs. 2.5 lakh per annum.\nNot availing any other scholarship."
        ,
        benefits: 
          "Academic allowance up to Rs. 12,000 per year.\nAdditional disability allowance for hostellers/day scholars.\nCovers professional and technical courses.\nDirect benefit transfer to student's bank account.\nSupports continued education among ST students."
        ,
        application_process: 
          "Register and apply through the NSP portal.\nFill in all necessary details.\nUpload documents (Aadhaar, caste certificate, income proof, Bonafide, academics).\nSubmit before the deadline (e.g., Nov 2024).\nTrack status through NSP portal."
        ,
        category: "Education",
        video_url: ""
      },

        {
          id: 17,
          title: "Him Care Scheme",
          description: "Provides cashless health insurance to Himachal families.\nTargets families left out of Ayushman Bharat PM-JAY.\nCovers medical expenses up to Rs. 5 lakh per year per family.\nFocuses on economically weaker sections of society.\nCovers more than 1800 medical and surgical procedures.",
          eligibility_criteria: "Resident of Himachal Pradesh.\nNot covered under Ayushman Bharat PM-JAY.\nSpecial priority to BPL, EWS, registered workers, disabled persons, etc.\nAnnual renewal needed.\nFamily must have a Him care Card.",
          benefits: "Health insurance cover up to Rs. 5 lakh per family per year.\nCovers hospitalization expenses.\nTreatment available in empanelled public/private hospitals.\nIncludes pre-existing diseases.\nCashless facility at point of service.",
          application_process: "Visit official Him care portal.\nRegister and fill application form.\nUpload necessary documents (Aadhaar, Ration card, Category certificate).\nPay nominal premium amount (if applicable).\nDownload Him care Card and use at hospitals.",
          category: "Health",
          video_url: ""
        },
        {
          id: 18,
          title: "Ayushman Bharat - PM-JAY (in Himachal Pradesh)",
          description: "Government's largest health insurance scheme for poor and vulnerable families.\nOffers cashless hospitalization up to Rs. 5 lakhs annually per family.\nCovers secondary and tertiary healthcare needs.\nBased on Socio-Economic Caste Census (SECC) 2011 database.\nReduces catastrophic out-of-pocket medical expenses for families.",
          eligibility_criteria: "Name in SECC 2011 beneficiary list.\nResident of Himachal Pradesh.\nNo need for enrollment if name exists in list.\nPriority to deprived rural families and urban workers.\nNo age, family size, or gender restrictions.",
          benefits: "Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.\nCashless and paperless access to services.\nCovers pre and post-hospitalization costs.\nTreatment in public and empanelled private hospitals.\nCovers over 1,500 medical procedures.",
          application_process: "Verify eligibility on the PM-JAY portal or CSC.\nVisit nearby Empanelled hospital/CSC center.\nProvide Aadhaar and family documents.\nAvail health services free of cost.\nNo premium payment required.",
          category: "Health",
          video_url: ""
        },
        {
          id: 19,
          title: "Mukhya Mantri Chikitsa Sahayata Kosh Yojana",
          description: "Provides financial aid for treatment of serious diseases.\nFocuses on patients not covered under other health insurance schemes.\nCovers diseases like cancer, renal failure, and major surgeries.\nHelps poor patients afford expensive medical treatments.\nSupports both government and selected private hospital treatments.",
          eligibility_criteria: "Resident of Himachal Pradesh.\nAnnual family income below Rs. 4 lakhs.\nSerious medical ailments like cancer, kidney/liver failure, etc.\nCertification from Government Hospital is mandatory.\nMust not have already availed full insurance coverage.",
          benefits: "Financial help up to Rs. 2.5 lakh.\nCovers critical illness treatments.\nDirect benefit transfer to hospital.\nFaster approvals for emergency cases.\nNo repayment needed.",
          application_process: "Collect application form from DC office/Civil Hospital.\nFill form with necessary medical certificates.\nSubmit to CMO office with income proof.\nApplication forwarded to district-level committee.\nFunds released directly to treating hospital.",
          category: "Health",
          video_url: ""
        },
        {
          id: 20,
          title: "Rashtriya Bal Swasthya Karyakram (RBSK)",
          description: "Dedicated to child health screening and early intervention services.\nCovers children from 0–18 years under 4 categories of diseases and defects.\nFocuses on early detection and treatment at no cost.\nHealth teams visit schools and anganwadis for check-ups.\nSupports specialized treatments and surgeries if required.",
          eligibility_criteria: "Children from birth to 18 years of age.\nGovernment and government-aided school students.\nAnganwadi centre enrolled children.\nHimachal Pradesh residents.\nCovers rural and urban areas.",
          benefits: "Free health check-ups by Mobile Health Teams.\nEarly detection and treatment of diseases.\nFree referral for surgeries or medical care.\nCovers 30 identified health conditions.\nRegular school-based health camps.",
          application_process: "Automatic inclusion if enrolled in Anganwadi or government school.\nAttend screening camps.\nReferral card issued if needed.\nFollow up at District Early Intervention Centers (DEIC).\nCompletely free for beneficiaries.",
          category: "Health",
          video_url: ""
        },
        {
          id: 21,
          title: "Janani Suraksha Yojana (JSY)",
          description: "Promotes institutional deliveries by providing cash assistance to pregnant women.\nTargets BPL and SC/ST categories.\nEnsures safe motherhood through public health services.\nIncludes benefits for both rural and urban mothers.\nCovers both normal and cesarean deliveries.",
          eligibility_criteria: "Pregnant women from BPL families or SC/ST categories.\nInstitutional delivery mandatory.\nRegistration of pregnancy at government health centre.\nResident of Himachal Pradesh.\nFirst two live births eligible.",
          benefits: "Rs. 1,400 cash assistance for rural mothers.\nRs. 1,000 cash assistance for urban mothers.\nCash transferred directly to mother's bank account.\nFree delivery services at public health institutions.\nFree C-section facility if needed.",
          application_process: "Register pregnancy at nearest health centre (ANM/ASHA worker).\nSubmit documents like Aadhaar, BPL card.\nDeliver at government hospital.\nASHA helps in documentation.\nReceive cash incentive post-delivery.",
          category: "Health",
          video_url: ""
        },
        {
          id: 22,
          title: "GROUP WORKSHED SCHEME",
          description: "Facilitate the establishment of worksheds for shuttleless looms in new or existing clusters to achieve economies of scale.\nOrganize powerloom units to provide better working conditions and boost efficiency for global competitiveness.",
          benefits: "Maximum Admissible Area: 400 sq.ft per shuttleless loom, 40% of loom area for weaving preparatory, and 125 sq.ft per person for dormitories.\nSubsidy Details: General – 40% (₹400/sq.ft), SC – 75% (₹750/sq.ft), ST – 90% (₹900/sq.ft).",
          eligibility_criteria: "The group must consist of at least 4 weavers or entrepreneurs, each with a separate legal entity.\nA minimum of 24 shuttleless looms (up to 230 cm) or 16 wider looms (230 cm and above) must be installed, with each beneficiary owning at least 4 looms.\nOnly TUFS-compatible machinery is eligible for installation under the scheme.",
          application_process: "Application Mode: Offline, with advertisements published in newspapers for scheme announcements.\nDocuments Required: Beneficiaries must provide documents/information as requested by the Textile Commissioner, who may inspect units to ensure proper scheme implementation.\nObtain Application Form: Get the form from the Textile Commissioner's office or other designated centers.\nPrepare Documents: Gather required documents like registration details, loom ownership, and TUFS-compatible machinery proof.\nSubmit Application: Submit the completed form and documents within the deadline.\nInspection & Follow-up: The Textile Commissioner may request additional info or inspect the unit.",
          category: "Business",
          video_url: ""
        }
        
    ];

    

async function updateSchemes() {
  try {
    // First, delete existing records
    const { error: deleteError } = await supabase
      .from('schemes')
      .delete()
      .not('id', 'is', null);

    if (deleteError) throw deleteError;

    // Then, insert new schemes
    const { error: insertError } = await supabase
      .from('schemes')
      .insert(schemes);

    if (insertError) throw insertError;

    console.log('Successfully updated schemes');
  } catch (error) {
    console.error('Error updating schemes:', error);
  }
}

updateSchemes();

export default schemes;