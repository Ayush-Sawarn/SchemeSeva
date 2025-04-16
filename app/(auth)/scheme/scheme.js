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
    category: "Agriculture"
  },
  {
    id: "2",
    title: "Prakritik Kheti Khushhal Kisan Yojana",
    description: "1. This scheme is launched to promote the agriculture through non-chemical, low cost, climate resilient and environment friendly Natural farming(promotes the use of cow dung and cow urine).\n2. Aims to increase farmers income with low-investment techniques (Encorages Zero-budget natural farming to reduce farming).\n3. Provides the training and technical support to farmers.\n4. Supports the marketing of organic produce at premimum prices.",
    eligibility_criteria: "Farmers:\na) Should be resident of HP and engaged in agriculture.\nb) Small, marginal, and medium-scale farmers are prioritized.\nc) Cooperative farmer groups can apply for cluster based benefits",
    benefits: "1. Women Farmers and SC/ST farmers receive additional benefits.\n2. Preference given to those willing to adopt 100% organic farming.\n3. Financial assistence maximum upto Rs. 8000/- per natural farming is being provided for lining cattle sheds which would facilitate collection of cow dung.\n4. A subsidy of 50% is being provided for the purchase of desi cow limited to Rs. 25,000/- and additional Rs. 5000/- for the trasportation purpose.",
    application_process: "1. Go to the Portal:\n2. Visit: https://naturalfarming.hp.gov.in/\n3. Fill in the Registration Form",
    category: "Agriculture"
  },
  {
    id: "3",
    title: "Flow Irrigation Scheme",
    description: "1. Designed to provide irrigation support in hilly and sloped terrains of Himachal Pradesh\n2. Government has decided to grant 50 percent subsidy for construction of bore wells and shallow for individual for irrigation purposes under the scheme\n3. A fund of rs. 15.00 crore was spent during financial year 2022-23 covering an area of 600 hectares benefiting 820 numbers of farmers.\n4. A budget provision of rs .8.00 crores have been made under the scheme for fy 2023-24",
    eligibility_criteria: "1. Applicants must be permanent residents of himachal pradesh\n2. Farmers should own agricultural land with in state\n3. Both indiviual farmers and group (such as water User Associations) are eligible.",
    benefits: "1. Up to 100% subsidy for small/marginal farmers.\n2. Irrigation to dry and remote farm areas.\n3. Encourages multiple cropping.\n4. Improves water use efficiency.",
    application_process: "1. Apply at the nearest Agriculture Department office.\n2. Submit land documents, Aadhaar, and water need statement.\n3. On-site survey and technical assessment.\n4. Project execution with financial support.\n5. Subsidy released post-completion.\nVisit: https://himachalforms.nic.in/panchayati-raj/yojanas.html",
    category: "Irrigation"
  },
  {
    id: "4",
    title: "Rajya Krishi Yantrikaran Programme",
    description: "1. Aimed to modernize agriculture through mechanization.\n2. Provides financial aid for purchase of farm machinery.\n3. A budget provision Rs.10.00 cr has been kept by the state government for implementation of this scheme during financial year 2023-24\n4. Supports individuals and Farmer Producer Organizations (FPOs).\n5. Encourages group-based machinery hiring for small farmers.",
    eligibility_criteria: "1. All registered farmers in HP.\n2. SC/ST and marginal farmers get priority.\n3. Farmer groups/cooperatives also eligible.",
    benefits: "1. 40–80% subsidy on machines like power tillers, weeders, etc.\n2. Availability of Custom Hiring Centres (CHCs).\n3. Easy access to modern equipment.\n4. Lowers long-term costs for farmers.",
    application_process: "1. Visit: https://himachalforms.nic.in/panchayati-raj/yojanas.html\n2. Visit your Block Agriculture Office.\n3. Submit Aadhaar, land, and bank details.\n4. Deposit your share; collect machine post-verification.\n5. CHCs can be approached if not buying directly.",
    category: "Agriculture"
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