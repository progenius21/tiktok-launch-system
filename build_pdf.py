from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    HRFlowable
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfgen import canvas

# Colours
BLACK = HexColor("#0A0A0A")
OFF_WHITE = HexColor("#F2EDE4")
WARM_GREY = HexColor("#A89F92")
ACCENT = HexColor("#FF2D55")
DARK_BG = HexColor("#111111")
BORDER = HexColor("#1E1E1E")

OUTPUT = "/tmp/tiktok-launch-system/public/TikTok-Launch-System-Guide.pdf"

# Styles
style_title = ParagraphStyle(
    "Title", fontName="Helvetica-Bold", fontSize=32, leading=38,
    textColor=OFF_WHITE, alignment=TA_LEFT, spaceAfter=8
)
style_subtitle = ParagraphStyle(
    "Subtitle", fontName="Helvetica", fontSize=13, leading=18,
    textColor=WARM_GREY, alignment=TA_LEFT, spaceAfter=24
)
style_module_header = ParagraphStyle(
    "ModuleHeader", fontName="Helvetica-Bold", fontSize=22, leading=28,
    textColor=OFF_WHITE, alignment=TA_LEFT, spaceAfter=6
)
style_module_tag = ParagraphStyle(
    "ModuleTag", fontName="Helvetica-Bold", fontSize=10, leading=14,
    textColor=ACCENT, alignment=TA_LEFT, spaceAfter=12,
    spaceBefore=4
)
style_section = ParagraphStyle(
    "Section", fontName="Helvetica-Bold", fontSize=15, leading=20,
    textColor=OFF_WHITE, alignment=TA_LEFT, spaceAfter=8, spaceBefore=20
)
style_body = ParagraphStyle(
    "Body", fontName="Helvetica", fontSize=11, leading=17,
    textColor=OFF_WHITE, alignment=TA_LEFT, spaceAfter=10
)
style_bullet = ParagraphStyle(
    "Bullet", fontName="Helvetica", fontSize=11, leading=17,
    textColor=OFF_WHITE, alignment=TA_LEFT, spaceAfter=6,
    leftIndent=20, bulletIndent=8
)
style_tip = ParagraphStyle(
    "Tip", fontName="Helvetica-Oblique", fontSize=10, leading=15,
    textColor=WARM_GREY, alignment=TA_LEFT, spaceAfter=12,
    leftIndent=16, borderColor=ACCENT, borderWidth=0, borderPadding=0
)
style_step_num = ParagraphStyle(
    "StepNum", fontName="Helvetica-Bold", fontSize=11, leading=15,
    textColor=ACCENT, alignment=TA_LEFT, spaceAfter=4
)
style_footer = ParagraphStyle(
    "Footer", fontName="Helvetica", fontSize=8, leading=10,
    textColor=WARM_GREY, alignment=TA_CENTER
)

def hr():
    return HRFlowable(width="100%", thickness=1, color=BORDER, spaceAfter=16, spaceBefore=16)

def module_page(num, title, tag, content_func):
    items = []
    items.append(PageBreak())
    items.append(Paragraph(f"MODULE {num}", style_module_tag))
    items.append(Paragraph(title.upper(), style_module_header))
    items.append(Paragraph(tag, style_subtitle))
    items.append(hr())
    items.extend(content_func())
    return items

def mod01():
    return [
        Paragraph("Why Warm-Up Matters", style_section),
        Paragraph("TikTok's algorithm evaluates new accounts within the first 72 hours. If you start posting immediately, the algorithm flags you as a potential spam account and suppresses your reach. The warm-up protocol trains TikTok to treat your account as a genuine, engaged user before you ever publish content.", style_body),
        Paragraph("Day 1: Account Creation", style_section),
        Paragraph("STEP 01 / Create a fresh TikTok account using a new email address. Do not use a phone number that has been linked to a previously banned account.", style_step_num),
        Paragraph("Use a clean device or clear your app data before creating the account. Set your region to the US (covered in Module 02). Choose a username relevant to your niche but do not include your app name directly. Complete your bio with a short, human-sounding description.", style_body),
        Paragraph("STEP 02 / Spend 30 to 45 minutes browsing content in your niche.", style_step_num),
        Paragraph("Search for keywords related to your app category. Watch videos fully (do not skip). Like 10 to 15 videos. Follow 5 to 8 accounts that post content similar to what you will create. Leave 2 to 3 genuine comments on popular videos. This signals to TikTok that you are a real user interested in a specific topic.", style_body),
        Paragraph("Day 2: Deepen Engagement", style_section),
        Paragraph("Repeat the browsing session from Day 1. Increase your comments to 5 to 7. Start saving videos to collections. Share 1 to 2 videos externally. Follow 3 to 5 more accounts. Do not post any content yet.", style_body),
        Paragraph("Pro tip: engage with both large and small creators in your niche. The algorithm learns your interest graph from these interactions.", style_tip),
        Paragraph("Day 3: Final Warm-Up", style_section),
        Paragraph("One more browsing session of 20 to 30 minutes. Comment on 3 to 5 videos. By the end of Day 3, your For You page should be heavily weighted toward your niche. This means the algorithm understands your interest category, and when you post, it will distribute your content to the right audience.", style_body),
        Paragraph("Common Mistakes to Avoid", style_section),
        Paragraph(u"\u2022  Posting on Day 1 (instant suppression risk)", style_bullet),
        Paragraph(u"\u2022  Following hundreds of accounts (looks like bot behaviour)", style_bullet),
        Paragraph(u"\u2022  Using a VPN that switches locations mid-session", style_bullet),
        Paragraph(u"\u2022  Copying your bio from another account word for word", style_bullet),
        Paragraph(u"\u2022  Liking content outside your niche during warm-up", style_bullet),
    ]

def mod02():
    return [
        Paragraph("Why Target the US Market", style_section),
        Paragraph("The US TikTok audience has the highest engagement rates, the most viral potential, and the best conversion rates to app installs. Even if your app serves a global audience, getting traction in the US first creates a snowball effect that spreads to other markets organically.", style_body),
        Paragraph("VPN Selection", style_section),
        Paragraph("Use a residential VPN, not a data centre VPN. TikTok can detect and flag data centre IP addresses. Recommended providers include NordVPN (residential add-on), Bright Data, or SmartProxy. Set your location to a major US city (New York, Los Angeles, Chicago, or Miami tend to perform best).", style_body),
        Paragraph("Setup Steps", style_section),
        Paragraph("STEP 01 / Install your VPN before creating the TikTok account.", style_step_num),
        Paragraph("Connect to a US residential IP. Verify your location by searching 'what is my IP' in a browser. Confirm it shows a US location.", style_body),
        Paragraph("STEP 02 / Set your phone's language and region to United States.", style_step_num),
        Paragraph("Go to Settings > General > Language and Region. Set region to United States. Set language to English (US). This affects what TikTok shows you and how it categorises your content.", style_body),
        Paragraph("STEP 03 / Remove your SIM card or enable airplane mode with Wi-Fi.", style_step_num),
        Paragraph("Your SIM card broadcasts your real location to TikTok. Either remove it or enable airplane mode and connect via Wi-Fi through your VPN. This is critical. Many people skip this step and wonder why their content does not reach US audiences.", style_body),
        Paragraph("STEP 04 / Keep the VPN active at all times when using TikTok.", style_step_num),
        Paragraph("Do not switch it off mid-session. Do not change server locations. Consistency is key. If TikTok detects location changes, it may flag the account.", style_body),
        Paragraph("Important: the VPN must stay on during the entire warm-up period from Module 01 and every time you post or engage with TikTok going forward.", style_tip),
    ]

def mod03():
    return [
        Paragraph("What Is a KOL Satellite Account", style_section),
        Paragraph("KOL stands for Key Opinion Leader. A satellite account is a TikTok profile that looks and feels like an independent influencer or tech reviewer, but is operated by you or your team. Instead of posting from your official brand account, you create multiple personas that organically discuss, review, or recommend your app.", style_body),
        Paragraph("Why This Works", style_section),
        Paragraph("People trust peer recommendations over brand advertising. When a user sees multiple different accounts talking about the same app, it creates social proof and FOMO. They think: 'Everyone is talking about this, I should check it out.' This is the strategy that generated 335K+ organic views across our accounts.", style_body),
        Paragraph("How to Build Your Satellite Network", style_section),
        Paragraph("STEP 01 / Create 3 to 5 satellite accounts, each with a distinct persona.", style_step_num),
        Paragraph("Give each account a unique username, bio, and posting style. One might be a 'tech reviewer,' another a 'productivity enthusiast,' another a 'student sharing study hacks.' Each warm-up follows the Module 01 protocol.", style_body),
        Paragraph("STEP 02 / Stagger your account creation.", style_step_num),
        Paragraph("Do not create all accounts on the same day or from the same device. Space them out by 2 to 3 days. Use different devices or clear app data between accounts.", style_body),
        Paragraph("STEP 03 / Post content that naturally features your app.", style_step_num),
        Paragraph("Never make it look like an ad. Frame it as a personal discovery: 'I found this app that actually works for...' or 'This changed how I do X.' The content should provide value first, with the app mention feeling incidental.", style_body),
        Paragraph("STEP 04 / Cross-pollinate between accounts.", style_step_num),
        Paragraph("Have satellite accounts comment on each other's posts. Not spam comments, but genuine engagement. 'I use this too, the X feature is amazing.' This creates the appearance of organic community buzz.", style_body),
        Paragraph("Scale Strategy", style_section),
        Paragraph("Once you have 3 to 5 accounts performing well, you can scale to 10, 20, or even 30 accounts. At that point, you hand the operation to VAs (covered in Module 06). The key is that each account maintains its unique persona and posting schedule.", style_body),
    ]

def mod04():
    return [
        Paragraph("Why Slides Outperform Video", style_section),
        Paragraph("Slide-style TikToks (image carousels with text overlays) consistently outperform traditional video content for app marketing. They are easier to produce at scale, require no on-camera presence, have higher completion rates (people swipe through), and the text-heavy format communicates product value more clearly than a quick video clip.", style_body),
        Paragraph("The 5-Slide Framework", style_section),
        Paragraph("SLIDE 1 / The Hook (Problem Statement)", style_step_num),
        Paragraph("Open with a relatable pain point. Make it specific and emotional. Example: 'I was spending 3 hours a day manually tracking my expenses...' or 'Every app I tried for X was either ugly or broken.' The hook must stop the scroll within 1 second.", style_body),
        Paragraph("SLIDE 2 / Amplify the Pain", style_step_num),
        Paragraph("Add context to why this problem matters. 'I tried 5 different apps. None of them could do Y.' or 'My workflow was completely broken until...' This slide builds empathy and keeps them swiping.", style_body),
        Paragraph("SLIDE 3 / The Discovery", style_step_num),
        Paragraph("Introduce your app as the solution, but frame it as a personal discovery. 'Then I found [App Name]...' Show a screenshot of the app interface. Keep it clean and focused on the key feature that solves the problem from Slide 1.", style_body),
        Paragraph("SLIDE 4 / The Proof", style_step_num),
        Paragraph("Show the result. Before and after. A specific metric. A screenshot of the outcome. 'Now I do X in 30 seconds instead of 3 hours.' Make it concrete and believable.", style_body),
        Paragraph("SLIDE 5 / The Soft CTA", style_step_num),
        Paragraph("Never say 'Download now' or 'Link in bio.' Instead: 'Honestly wish I found this sooner' or 'Free in the App Store if you want to try it.' Subtle. The goal is curiosity, not a hard sell. People who are interested will search for it.", style_body),
        Paragraph("Visual Design Rules", style_section),
        Paragraph(u"\u2022  Use high-contrast colours (dark backgrounds, white text)", style_bullet),
        Paragraph(u"\u2022  One idea per slide, never cram text", style_bullet),
        Paragraph(u"\u2022  Use real screenshots, not mockups", style_bullet),
        Paragraph(u"\u2022  Keep text to 15 words or fewer per slide", style_bullet),
        Paragraph(u"\u2022  Source background images from Pinterest or Freepik (covered in Module 05)", style_bullet),
    ]

def mod05():
    return [
        Paragraph("The Content Machine", style_section),
        Paragraph("Once you have the slide framework from Module 04 and multiple satellite accounts from Module 03, the next challenge is producing enough content to feed 10 to 30 accounts consistently. This module gives you the system to create a full week of content in under two hours.", style_body),
        Paragraph("Content Sourcing", style_section),
        Paragraph("STEP 01 / Hook generation with ChatGPT.", style_step_num),
        Paragraph("Prompt: 'Give me 20 TikTok slide hooks about [your app category] problems. Make them emotional, specific, and under 12 words each.' Filter the best 10 to 15 and save them to a spreadsheet. Each hook becomes one TikTok post.", style_body),
        Paragraph("STEP 02 / Background images from Pinterest and Freepik.", style_step_num),
        Paragraph("Search for aesthetic, high-contrast images that match your niche. Download 20 to 30 images per session. Create a folder organised by theme. These become the visual layer behind your text slides.", style_body),
        Paragraph("STEP 03 / Assembly in Canva.", style_step_num),
        Paragraph("Create a TikTok template (1080x1920) with your standard text style, font sizes, and colour scheme. Duplicate the template for each post. Drop in background images, add hook text, add product screenshots. Each TikTok should take 3 to 5 minutes to assemble once you have the template.", style_body),
        Paragraph("Translation and Localisation", style_section),
        Paragraph("If you are targeting multiple language markets, use ChatGPT to translate your hooks. Prompt: 'Translate these TikTok hooks to [language]. Keep them casual, emotional, and under 12 words.' Create separate accounts for each language market.", style_body),
        Paragraph("Posting Schedule", style_section),
        Paragraph("Post 1 to 2 times per day per account. Stagger posting times across accounts (not all at the same time). Best US posting times: 7am to 9am EST, 12pm to 2pm EST, 7pm to 10pm EST. Use TikTok's built-in scheduler or a tool like Later to queue posts.", style_body),
        Paragraph("Weekly Batch Workflow", style_section),
        Paragraph(u"\u2022  Monday: Generate 15 to 20 hooks (30 minutes)", style_bullet),
        Paragraph(u"\u2022  Monday: Source 20 to 30 background images (20 minutes)", style_bullet),
        Paragraph(u"\u2022  Tuesday: Assemble all slides in Canva (60 minutes)", style_bullet),
        Paragraph(u"\u2022  Tuesday: Schedule posts across all accounts (20 minutes)", style_bullet),
        Paragraph(u"\u2022  Total: under 2.5 hours for a full week of content across all accounts", style_bullet),
    ]

def mod06():
    return [
        Paragraph("When to Hire a VA", style_section),
        Paragraph("Once you have proven the system works on 3 to 5 accounts and have a repeatable content workflow, it is time to delegate. A VA can run the entire content engine while you focus on building your product. Most founders hire at the 4 to 6 week mark.", style_body),
        Paragraph("Where to Find VAs", style_section),
        Paragraph("Onlinejobs.ph is the best platform for finding affordable, reliable TikTok VAs. Look for candidates with social media experience. You do not need someone who has specifically managed TikTok accounts before. The SOPs you provide will train them. Expect to pay $3 to $6 per hour for quality work.", style_body),
        Paragraph("The Hiring Process", style_section),
        Paragraph("STEP 01 / Post a job listing.", style_step_num),
        Paragraph("Title: 'TikTok Content Manager for App Marketing.' Description: 'We need someone to create slide-style TikTok content using Canva templates, manage multiple accounts, and follow a detailed posting schedule. Training and SOPs provided. 4 to 6 hours per day.'", style_body),
        Paragraph("STEP 02 / Screen candidates with a test task.", style_step_num),
        Paragraph("Send them one of your Canva templates and ask them to create 3 TikTok slides from scratch using hooks you provide. This tests their design sense, attention to detail, and ability to follow instructions. Pay them for the test task.", style_body),
        Paragraph("STEP 03 / Onboard with recorded training.", style_step_num),
        Paragraph("Record a 20 to 30 minute Loom video walking through the entire workflow: hook selection, image sourcing, Canva assembly, posting schedule, account switching. Give them access to your shared Canva workspace and content spreadsheet.", style_body),
        Paragraph("SOPs to Provide", style_section),
        Paragraph(u"\u2022  Account warm-up checklist (from Module 01)", style_bullet),
        Paragraph(u"\u2022  VPN setup and maintenance guide (from Module 02)", style_bullet),
        Paragraph(u"\u2022  Content creation workflow (from Module 05)", style_bullet),
        Paragraph(u"\u2022  Posting schedule with exact times per account", style_bullet),
        Paragraph(u"\u2022  Quality control checklist: font sizes, image quality, hook clarity", style_bullet),
        Paragraph(u"\u2022  Escalation process: what to do if an account gets flagged", style_bullet),
        Paragraph("Quality Control", style_section),
        Paragraph("Review the first week of content before it goes live. After that, do a weekly 15-minute spot check. Track views per account in a shared spreadsheet. If an account's views drop significantly, review recent posts for quality issues or potential shadowbanning.", style_body),
    ]

def mod07():
    return [
        Paragraph("What You Get", style_section),
        Paragraph("Lifetime access to the private Telegram group for TikTok Launch System members. This is where founders running the system share results, ask questions, troubleshoot issues, and exchange winning hooks and strategies.", style_body),
        Paragraph("How to Join", style_section),
        Paragraph("Click the Telegram invite link in your welcome email or visit:", style_body),
        Paragraph("https://t.me/+Rmp0w4E4y0ZiNDU8", style_section),
        Paragraph("Community Guidelines", style_section),
        Paragraph(u"\u2022  Introduce yourself: what app you are building and where you are in the process", style_bullet),
        Paragraph(u"\u2022  Share wins: screenshots of views, install numbers, successful hooks", style_bullet),
        Paragraph(u"\u2022  Ask specific questions: 'My account got 200 views on the first post, is that normal?' is better than 'Help me'", style_bullet),
        Paragraph(u"\u2022  No self-promotion outside of sharing your TikTok content for feedback", style_bullet),
        Paragraph(u"\u2022  Be constructive: critique content, not people", style_bullet),
        Paragraph("What to Share", style_section),
        Paragraph("The community thrives when members share real data. Post your analytics screenshots, your best-performing hooks, your content templates, and your VA hiring experiences. The more specific you are, the more useful the feedback.", style_body),
        Paragraph("Getting Direct Feedback", style_section),
        Paragraph("Post your TikTok content drafts in the group before publishing. Other founders will give you feedback on your hooks, visuals, and CTAs. This peer review process significantly improves content quality and catch issues before they go live.", style_body),
    ]

# Custom page background
class PDFBackground(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        for page_dict in self.pages:
            self.__dict__.update(page_dict)
            self._draw_bg()
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def _draw_bg(self):
        self.setFillColor(BLACK)
        self.rect(0, 0, letter[0], letter[1], fill=True, stroke=False)


# Build the document
doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    leftMargin=60, rightMargin=60,
    topMargin=60, bottomMargin=60,
    title="TikTok Launch System",
    author="TikTok Launch"
)

story = []

# Cover page
story.append(Spacer(1, 100))
story.append(Paragraph("TIKTOK LAUNCH SYSTEM", ParagraphStyle(
    "CoverTitle", fontName="Helvetica-Bold", fontSize=38, leading=44,
    textColor=OFF_WHITE, alignment=TA_LEFT
)))
story.append(Spacer(1, 12))
story.append(HRFlowable(width="40%", thickness=3, color=ACCENT, spaceAfter=20))
story.append(Paragraph("0 to 10,000 Users. Zero Ad Spend.", ParagraphStyle(
    "CoverSub", fontName="Helvetica", fontSize=16, leading=22,
    textColor=WARM_GREY, alignment=TA_LEFT
)))
story.append(Spacer(1, 40))
story.append(Paragraph("The complete system for app founders who want organic traction through TikTok. Seven modules covering account setup, content creation, scaling, and delegation.", style_body))
story.append(Spacer(1, 60))
story.append(Paragraph("WHAT IS INSIDE", style_module_tag))
story.append(Spacer(1, 8))

toc_items = [
    ("01", "Account Warm-Up System", "Foundation"),
    ("02", "VPN Setup for US Market", "Setup"),
    ("03", "KOL Satellite Account Strategy", "Growth Engine"),
    ("04", "Viral Slide-Style TikTok Framework", "Content"),
    ("05", "Content at Scale (30 Accounts)", "Scale"),
    ("06", "VA Execution Playbook", "Delegation"),
    ("07", "Private Founder Community", "Community"),
]

for num, title, tag in toc_items:
    story.append(Paragraph(
        f'<font color="#FF2D55">{num}</font>  {title}  <font color="#A89F92">/ {tag}</font>',
        ParagraphStyle("TOC", fontName="Helvetica", fontSize=12, leading=22,
                       textColor=OFF_WHITE, alignment=TA_LEFT, leftIndent=8)
    ))

story.append(Spacer(1, 60))
story.append(Paragraph("Notion Guide: notion.so/32ba77c20e9381c7a9fcf3494e14f8b9", style_tip))
story.append(Paragraph("Community: t.me/+Rmp0w4E4y0ZiNDU8", style_tip))

# Modules
story.extend(module_page("01", "Account Warm-Up System", "Foundation", mod01))
story.extend(module_page("02", "VPN Setup for US Market", "Setup", mod02))
story.extend(module_page("03", "KOL Satellite Account Strategy", "Growth Engine", mod03))
story.extend(module_page("04", "Viral Slide-Style TikTok Framework", "Content", mod04))
story.extend(module_page("05", "Content at Scale (30 Accounts)", "Scale", mod05))
story.extend(module_page("06", "VA Execution Playbook", "Delegation", mod06))
story.extend(module_page("07", "Private Founder Community", "Community", mod07))

# Build
doc.build(story, canvasmaker=PDFBackground)
print(f"PDF created: {OUTPUT}")
