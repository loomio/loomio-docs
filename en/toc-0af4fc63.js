// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/overview/index.html">Overview</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/overview/orientation.html">Orientation tour</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/overview/how-to-participate.html">How to participate</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/making_decisions/index.html">Making decisions</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/making_decisions/simple_decision_process.html">Simple decision process</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/making_decisions/advice_process.html">Advice process</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/making_decisions/consent_process.html">Consent process</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/making_decisions/consensus_process.html">Consensus process</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/index.html">Groups</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/starting_a_group/index.html">Starting a group</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/settings/index.html">Group settings</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/inviting_people/index.html">Inviting people</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/member_management/index.html">Member management</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/delegated_voters/index.html">Delegated voters</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/subgroups/index.html">Subgroups</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/email/index.html">Email address</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/participation_report/index.html">Participation report</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/data_export/index.html">Data export</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/deleting_your_group/index.html">Deleting your group</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/index.html">Discussions</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/starting_a_discussion/index.html">Starting a discussion</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/notifying_people/index.html">Notifying people</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/using_discussions/index.html">Using  discussions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/formatting/index.html">Formatting</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/tasks/index.html">Tasks</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/direct_discussions/index.html">Direct Discussions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/discussion_management/index.html">Discussion management</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/tags/index.html">Category tags</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/examples/index.html">Examples</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/discussions/templates/index.html">Templates</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/intro_to_decisions/index.html">Proposals and polls</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/proposals/index.html">Proposals</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/proposal_types/index.html">Polls</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/stv/index.html">STV Elections</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/quorum/index.html">Quorum</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/vote_share_requirements/index.html">Vote Share Requirements</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/meeting_polls/index.html">Meeting polls</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/starting_proposals/index.html">Settings</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/inviting_people/index.html">Invite to vote</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/outcomes/index.html">Outcomes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/polls/poll_templates/index.html">Poll templates</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/users/user_profile/index.html">Your profile</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/users/email_settings/index.html">Notifications</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/users/merge_accounts/index.html">Merge accounts</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/users/translation/index.html">Language and translation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/users/deleting_your_account/index.html">Deleting your account</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/integrations/chatbots/index.html">Chatbots</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/integrations/discord/index.html">Discord</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/integrations/matrix/index.html">Matrix</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/integrations/mattermost/index.html">Mattermost</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/integrations/microsoft_teams/index.html">Microsoft Teams</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/integrations/slack/index.html">Slack</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="user_manual/groups/integrations/api/index.html">API</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="newsletter/index.html">Newsletter</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Subscriptions</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/subscriptions/pricing.html">Subscription plans</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/subscriptions/pricing_faq.html">Customer FAQs</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/subscriptions/management/index.html">Subscription management</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Policies</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/terms/index.html">Terms of Service</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/ownership/index.html">Account Ownership</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/abuse/index.html">Use restrictions</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/privacy/index.html">Privacy Policy</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/privacy/regulations/index.html">Regulations</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/privacy/loomio-subprocessors/index.html">Loomio Subprocessors</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/privacy/company-processors/index.html">Company Processors</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="policy/security/index.html">Security</a></span></li><li class="chapter-item expanded "><li class="spacer"></li></li><li class="chapter-item expanded "><li class="part-title">Guides</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/facilitators_guide/index.html">The Facilitator&#39;s Guide to Loomio</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/facilitators_guide/preparation/index.html">Preparation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/facilitators_guide/commencing/index.html">Commencing</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/facilitators_guide/underway/index.html">Underway</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/facilitators_guide/concluding/index.html">Concluding</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/facilitators_guide/ongoing_practice/index.html">Ongoing Practice</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/board_processes/index.html">Good Governance Guide to Loomio</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/board_processes/meeting.html">Prepare for a meeting</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/board_processes/facilitating_discussions.html">Facilitating discussions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/board_processes/decisions.html">Making resolutions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/board_processes/practices.html">Governance practices</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/board_processes/admin.html">Record keeping</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="guides/board_processes/introduce.html">Introducing Loomio to your board</a></span></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            // Check both with and without the '.html' suffix to be robust against pretty URLs
            if (link.href.replace(/\.html$/, '') === current_page.replace(/\.html$/, '')
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }

        // Adding logo above the chapter headings, following advice on github:
        // https://github.com/rust-lang/mdBook/issues/2490#issuecomment-3429573003
        const newDiv = document.createElement("div");
        const newLink = document.createElement("a");
        newLink.setAttribute('href', "https://loomio.com");
        newLink.classList.add('toc-logo')
        const newIMG= document.createElement("img");
        newIMG.setAttribute("src","https://www.loomio.com/brand/logo_gold.svg")
        const newPath = document.createElement("path");
        newLink.appendChild(newIMG)
        newDiv.appendChild(newLink);
        this.prepend(newDiv);

        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);

