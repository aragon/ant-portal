import { keccak256 } from 'ethers/lib/utils'

export const TERMS_URL_PATH = './terms/redemption-terms-and-conditions.pdf'

export function getTermsHash(): Promise<string> {
  return fetch(TERMS_URL_PATH)
    .then((res) => res.arrayBuffer())
    .then((termsBytes) => {
      return keccak256(new Uint8Array(termsBytes))
    })
}

export const TERMS_AND_CONDITIONS = `ANT Token Redemption Initiative - Terms and Conditions
Last Updated: Version 0.1 - October [12], 2023

Please read these ANT Token Redemption Initiative terms and conditions (these “Terms”) carefully before you interact with the ANT token redemption smart contract [the “ANT Redemption Contract”; link to the smart contract accessible on https://ant.aragon.org/].

These Terms govern your use of the ANT Redemption Contract for the redemption of Aragon Network Tokens (“ANT”) against Ether, the native cryptocurrency of the Ethereum network (“ETH”) according to the software code of the ANT Redemption Contract And (the “ANT Redemption Initiative”) is an agreement between you or the entity you represent and Aragon Association, Zug Switzerland (the “Aragon Association”). 

By using or otherwise accessing the ANT Redemption Contract, you (1) agree that you have read and understand these Terms, and (2) accept and agree to these Terms. 

If you do not agree to theseTerms, then you are not permitted to use or interact with the ANT Redemption Contract.

BY USING THE ANT REDEMPTION CONTRACT, YOU HEREBY AGREE THAT YOU ARE NOT A CITIZEN OF, LOCATED IN, INCORPORATED IN, OR OTHERWISE HAVE A REGISTERED OFFICE IN CUBA, IRAN, MYANMAR (BURMA), NORTH KOREA, SYRIA, THE REGIONS OF CRIMEA, DONETSK OR LUHANSK, OR ANY OTHER COUNTRY OR REGION THAT IS THE SUBJECT OF COMPREHENSIVE COUNTRY-WIDE OR REGION-WIDE ECONOMIC SANCTIONS BY THE UNITED STATES OF AMERICA, CANADA, THE UNITED KINGDOM, OR THE EUROPEAN UNION, INCLUDING, BUT NOT LIMITED TO, THOSE OF THE UNITED STATES OFFICE OF FOREIGN ASSET CONTROL (“OFAC”) (COLLECTIVELY, “SANCTIONED TERRITORIES”). YOU ALSO HEREBY AGREE THAT YOU ARE NOT THE SUBJECT OF ECONOMIC OR TRADE SANCTIONS ADMINISTERED OR ENFORCED BY ANY GOVERNMENTAL AUTHORITY, INCLUDING, BUT NOT LIMITED TO, OFAC, OR OTHERWISE DESIGNATED ON ANY LIST OF PROHIBITED OR RESTRICTED PARTIES (TOGETHER WITH ANY PERSON OR ENTITY FROM A SANCTIONED TERRITORY, A “SANCTIONED PERSON”). IF YOU FALL WITHIN EITHER OF THESE CATEGORIES, YOU MUST NOT USE THE ANT REDEMPTION CONTRACT.

YOU ACKNOWLEDGE, UNDERSTAND, AND AGREE TO THE FOLLOWING:

Voluntary Initiative.
ANT does not represent any right or obligation for the Aragon Association. The ANT Redemption Initiative is voluntary, and the Aragon Association may stop or change the initiative at any time. Nothing expressed or implied in these Terms will create any right to use or interact with the ANT Redemption Contract.

Fixed Price.
ANT will be redeemed at a fixed rate for ETH that is programmed into the ANT Redemption Contract. Such a rate may be above or below any market price on the date when the ANT Redemption Contract is released.

Purpose - Eliminate the ANT Supply.
The intention of the ANT Redemption Initiative is to eliminate the supply of ANT. The initiative does not serve any investment purpose or activity related to the capital markets, including but not limited to a reduction of the supply of ANT to increase the value of ANT.

ANT - Lack of Utility and Purpose.
After the expiration of the ANT Redemption Contract, ANT will no longer (a) be supported by the Aragon Association or any of its successor organizations or communities, and (b) have any utility or purpose in the Aragon ecosystem.

No Speculative Intention.
You do not use or interact with the ANT Redemption Contract for speculative purposes.

Expiration - No Further Redemption.
The ANT Redemption Contract will be shut down and will no longer accept ANT after November 2th 2024 23.59 UTC. It is your sole responsibility to make sure that you redeem your ANT in time.

Compliance with Laws.
Access to and use of the ANT Redemption Contract is only permitted in compliance with applicable laws, and regulations, including financial market laws, export control laws, or other laws or regulations. By accessing and using the ANT Redemption Contract, you represent and warrant that your doing so is in compliance with all laws of your jurisdiction or that apply to you. You may not access or use the ANT Redemption Contract, or encourage, induce, promote, facilitate, or direct others to access or use the ANT Redemption Contract for any illegal, harmful, fraudulent, or infringing purpose.

Age of Majority.
The ANT Redemption Contract is intended only for access and use by individuals at least eighteen (18) years old (or the age of majority in the applicable user’s jurisdiction). You represent and warrant that you are at least eighteen (18) years of age (or the age of majority in your jurisdiction) with the full authority, right, and capacity to enter into this agreement and abide by all of these Terms.

Interaction at Your Own Risk.
All access to and use of the ANT Redemption Contract is at the sole risk of the person accessing or using the ANT Redemption Contract. You represent that you have  read, and taken reasonable steps to understand,  the program code of the ANT Redemption Contract and its features and functionalities before interacting with it in any way. In order to use the contract, you will need to connect a digital asset wallet. Custody and title to the digital assets held in your digital wallet shall at all times remain with you and shall not transfer to us. As the owner of such digital assets, you shall bear all risk of loss.Further, you retain sole responsibility for any loss of private keys associated with your digital wallet.

Title to Tokens; Risk of Loss.
The redemption of ANT shall be deemed and is executed in Switzerland. Title to, and risk of loss of the redemption passes from you to the ANT Redemption Contract (ANT) and from the ANT Redemption Contract to you (ETH) in Switzerland upon when you transfer ANT to the ANT Redemption Contract.

Limitation of Liability.
To the fullest extent permitted by applicable law, in no event shall the Aragon Association, its affiliates (including any ecosystem participants), or any of Aragon Association’s affiliates, past, present, and future employees, officers, directors, contractors, consultants, contributors, suppliers, vendors, service providers, subsidiaries, agents, representatives, predecessors, successors, and assigns (the “Aragon Project”) , be liable for any claims, direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services, loss of use, data, assets, or profits, or business interruption) or any other liability, whether in an action of contract, tort, or otherwise, arising out of or in connection with the access and use of the ANT Redemption Contract.

No Professional or Fiduciary Duties.
All information provided in connection with your access and use of the ANT Redemption Contract is for informational purposes only and should not be construed as professional, financial or legal advice. Before using the ANT Redemption Contract, you should seek independent professional advice from an individual who is licensed and qualified in the area for which such advice would be appropriate. These Terms are not intended to, and do not, create or impose any fiduciary duties on us. You further agree that the only duties and obligations that we owe you are those set out expressly here.

Tax Consequences.
You understand and agree that your use of the ANT Redemption Contract may result in certain tax consequences and obligations, including income or capital gains tax, value-added tax, goods and services tax, or sales tax. It is your sole responsibility to determine whether taxes apply to any transactions you initiate or receive through use of the ANT Redemption Contract and, if so, to report and/or remit the correct tax to the appropriate tax authority.

DISCLAIMER OF WARRANTY.
THE ANT REDEMPTION CONTRACT IS OFFERED ON AN “AS IS” AND “AS AVAILABLE” BASIS. WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE ANT REDEMPTION CONTRACT, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THE ANT REDEMPTION CONTRACT IS AT YOUR SOLE RISK.

General Release and Waiver of Claims.
By redeeming ANT, you forever waive your right to sue, release and discharge the Aragon Project, from all known and unknown charges, complaints, claims, grievances, liabilities, obligations, promises, agreements, controversies, damages, actions, causes of action, suits, rights, demands, costs, losses, debts, penalties, promises, fees, wages, expenses (including attorneys’ fees and costs actually incurred), and damages of any kind (including direct, indirect, incidental, special, exemplary, or consequential damages), of any nature whatsoever, known or unknown, which either you have, or may have had, against the Aragon Project, whether or not apparent or yet to be discovered, or which may hereafter develop.

Acting on Behalf of Others.
If you redeem ANT on behalf of another natural or legal person (e.g., if you are a centralized exchange, digital asset service provider, or any other type of representative), you hereby represent and warrant that (i) if such person is a legal person, such legal person is duly organized and validly existing under the applicable laws of the jurisdiction of its organization, (ii) you are duly authorized by such natural or legal person to act on its behalf and to accept these Terms, and (iii) such natural or legal person acknowledges, understands, and agrees to, and will be responsible for, breach of these Terms jointly and severally with you.

Governing Law and Jurisdiction.
These Terms shall in all respects be governed by and construed in accordance with Swiss law (to the exclusion of conflict laws). Any dispute arising out of or in connection with these Terms shall be exclusively referred to the courts competent for the City of Zug, Switzerland.

Class Action and Jury Waiver.
All disputes, if any, must be brought against the Aragon Association in your individual capacity and not as a plaintiff in or member of any purported class action, collective action, private attorney general action, or other representative proceeding. You and we both agree to waive the right to demand a trial by jury.

Waiver and Severability.
No waiver by the Aragon Association of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the Aragon Association to assert a right or provision under these Terms shall not constitute a waiver of such right or provision. If any provision of these Terms held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of these Terms continue in full force and effect.
`
