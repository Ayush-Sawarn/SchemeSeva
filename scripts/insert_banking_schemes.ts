import { supabase } from '../lib/supabase';

const bankingSchemes = [
  {
    title: "NSAP - Indira Gandhi National Old Age Pension Scheme",
    description: "IGNOAPS provides monthly pensions to BPL citizens aged 60 years and above. Pension amount: ₹200 (60–79 years) and ₹500 (80+ years). Part of the National Social Assistance Programme (NSAP) launched on 15th August 1995. Targets destitute individuals with little or no income in rural and urban areas. NSAP fulfils Directive Principles of State Policy by promoting welfare and livelihood support.",
    benefits: "A monthly pension of ₹ 200 up to 79 years and ₹ 500 thereafter.",
    eligibility_criteria: "The applicant should be a citizen of India.\nThe applicant should be living Below Poverty Line.\nThe applicant should be at least 60 years of age.",
    application_process: "1. Download UMANG App or visit website https://web.umang.gov.in/web_new/home\n2. Login using mobile number and OTP\n3. Search for NSAP\n4. Click on 'Apply Online'\n5. Fill the basic details, choose the mode of payment of pension, upload photo and click on 'Submit'",
    category: "Banking",
    video_url: ""
  },
  {
    title: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    description: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) is a life insurance scheme covering death from any cause. It provides one-year insurance, which you can renew every year. The scheme is available through banks and post offices, handled by life insurance companies. Anyone aged 18 to 50 years with a bank or post office account can join. It's an easy and affordable way to get life insurance protection.",
    benefits: "PMJJBY offers one-year term life cover of ₹ 2.00 Lakh to all the subscribers in the age group of 18-50 years.\nIt covers death due to any reason.\nPremium payable is ₹ 436/- per annum per subscriber, to be auto debited from the subscriber's bank/post office account.",
    eligibility_criteria: "The age of the applicant must be between 18 to 50 Years.\nThe applicant must hold an individual bank / post office account.",
    application_process: "1. Download and take print of the 'CONSENT-CUM-DECLARATION FORM' from: https://www.jansuraksha.gov.in/Files/PMJJBY/English/ApplicationForm.pdf\n2. Duly fill and sign the application form\n3. Attach the self-attested copies of the required documents\n4. Submit the case to the authorised official of Bank / Post Office\n5. The official will return you the 'ACKNOWLEDGEMENT SLIP CUM CERTIFICATE OF INSURANCE'",
    category: "Banking",
    video_url: ""
  },
  {
    title: "Atal Beemit Vyakti Kalyan Yojana",
    description: "It gives cash relief to insured workers who become unemployed. The cash amount is 50% of their average daily earnings, for a maximum of 90 days. To get benefits, the person must have at least 2 years of insured work. They must have worked at least 78 days in each of the last three contribution periods before claiming.",
    benefits: "The scheme gives 50% of the last average daily earnings during unemployment, for up to 90 days (only once in a lifetime).\nThe employee must have at least 2 years of insured work and contributed 78 days in the period just before unemployment and in one more period within the last two years.\nMedical benefits under the ESIC Act are also available during the relief period.\nThe claim becomes due after 30 days of unemployment (earlier it was 90 days).",
    eligibility_criteria: "The insured person must have been unemployed, with at least 2 years of insurable work and 78 days' contribution in each of the last three periods.\nEmployer's contribution should be paid/payable, and unemployment must not be due to misconduct, retirement, or voluntary resignation.\nAadhaar and bank account must be linked to the ESIC database.",
    application_process: "1. Visit the ESIC website (https://esic.gov.in/)\n2. Sign up by providing your Insurance Number, Date of Birth, and Mobile Number to create a username and password\n3. Log in and select the scheme to claim benefits\n4. Complete the application form, upload necessary documents like the AB-1 Form and Aadhaar Card\n5. Submit the claim and take printouts of the claim and the generated employer letter\n6. Submit to the employer\n7. The Branch Office staff will verify the claim, calculate eligibility, and the relief amount\n8. Payment will be made to the applicant's bank account",
    category: "Banking",
    video_url: ""
  },
  {
    title: "Prime Minister's Employment Generation Programme",
    description: "PMEGP, launched in 2008, helps create jobs by setting up small businesses in rural and urban areas. The scheme is extended for 5 years (2021-2026) with ₹13,554.42 crore to set up 4,00,000 projects and create 30 lakh jobs. It was created by merging two old schemes, PMRY and REGP. Every year, 1,000 units will be upgraded, creating about 8 jobs per unit.",
    benefits: "Margin Money Subsidy: Funds are allocated for new micro-enterprises and upgrading existing units. ₹100 Crores is set aside each year for upgrading PMEGP/REGP/MUDRA units.\nSupport for New Units: For new enterprises, general category beneficiaries get 15% subsidy in urban areas and 25% in rural areas, while special category beneficiaries get higher subsidies (25% in urban and 35% in rural areas).\nBank Loan Support: Beneficiaries must contribute a percentage of the project cost, and banks provide the rest. If costs exceed subsidy limits, the extra amount will be covered by the bank without government support.",
    eligibility_criteria: "Any individual above 18 years can apply. For projects over ₹10 lakh (Manufacturing) or ₹5 lakh (Business/Service), the applicant must have at least an VIII standard education. Existing units or those receiving government subsidies are not eligible.\nFor upgradation, the unit must have repaid the first loan, completed the 3-year lock-in period, and show profits with potential for growth after upgrading.\nPriority: Preference will be given to people affected by natural disasters, as declared under the Disaster Management Act.",
    application_process: "New Unit Application:\n1. Visit the PMEGP portal\n2. Click on 'Apply' under 'Application For New Unit'\n3. Fill in the required details\n4. Upload documents\n5. Submit\n\nExisting Unit Application (2nd Loan):\n1. Visit the portal\n2. Click on 'Apply' under 'Existing Units (2nd Loan)'\n3. Complete the form\n4. Upload documents\n5. Submit\n\nLogin for Registered Applicants (Second Loan):\n1. Visit the portal\n2. Enter your User ID and Password\n3. Log in to proceed",
    category: "Banking",
    video_url: ""
  }
];

async function insertSchemes() {
  try {
    const { data, error } = await supabase
      .from('schemes')
      .insert(bankingSchemes);

    if (error) {
      console.error('Error inserting schemes:', error);
      return;
    }

    console.log('Successfully inserted banking schemes');
  } catch (error) {
    console.error('Error:', error);
  }
}

insertSchemes(); 