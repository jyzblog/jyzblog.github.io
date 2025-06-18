import React, { Fragment } from 'react';
import Nav from '../components/nav';
import Book from '../components/book';
import styles from '../styles/content.module.css';

function books() {
  return (
    <Fragment>
      <Nav />

      <div className={styles.toc}>
        <h4>Table of Content</h4>
        <div>
          <a href="#history">History</a>
          <a href="#investing">Investing</a>
          <a href="#startup">Startup</a>
          <a href="#leadership">Leadership</a>
          <a href="#biography">Biography</a>
          <a href="#industries">Industries</a>
        </div>
      </div>
      <div className={styles.content}>
        <h3 id="history">History / Macroeconomics:</h3>
        <ul>
          <Book
            title="Sapiens: A Brief History of Humankind"
            address="https://amzn.to/3n0bHWk"
            author="Yuval Noah Harari"
            hashtags={['civilization']}
          />
          <Book
            title="Americana: A 400-Year History of American Capitalism"
            address="https://amzn.to/2JFdZf6"
            author="Bhu Srinivasan"
            hashtags={['United States', 'capitalism', 'industries']}
          />
          <Book
            title="Principle: Dealing with The Changing World Order"
            address="https://www.amazon.com/Changing-World-Order-Nations-Succeed/dp/1982160276/"
            author="Ray Dalio"
            hashtags={['Empire', 'Cycles', 'capitalism']}
          />
          <Book
            title="Energy and Civilization: A History"
            address="https://amzn.to/32nKx3H"
            author="Vaclav Smil"
            hashtags={['energy', 'civilization']}
          />
          <Book
            title="Guns, Germs, and Steel"
            address="https://amzn.to/32okxp2"
            author="Jared Diamond"
            hashtags={['civilization']}
          />
          <Book
            title="The Lessons of History"
            address="https://amzn.to/32m6m3I"
            author="Will Durant"
            hashtags={['evolution']}
          />
          <Book
            title="The Path Between the Seas: The Creation of the Panama Canal, 1870-1914"
            address="https://amzn.to/2U1BT6C"
            author="David McCullough"
            hashtags={['United States', 'Latin America']}
          />
          <Book
            title="Longitude: The True Story of a Lone Genius Who Solved the Greatest Scientific Problem of His Time"
            address="https://amzn.to/368579i"
            author="David Sobel"
            hashtags={['Europe', 'chronometer', 'astronomy']}
          />
          <Book
            title="The Sovereign Individual: Mastering the Transition to the Information Age"
            address="https://amzn.to/3laQuIS"
            author="James Dale Davidson"
            hashtags={['libertarianism']}
          />
          <Book
            title="Divine Fury: A History of Genius"
            address="https://amzn.to/3laMtUP"
            author="Darrin M. McMahon"
            hashtags={['genius']}
          />
          <Book
            title="The 48 Laws of Power"
            address="https://amzn.to/3k9Mp6v"
            author="Robert Greene"
            hashtags={['economics', 'power']}
          />
          <Book
            title="The Rise and Fall of the Third Reich: A History of Nazi Germany"
            address="https://amzn.to/2U3aRLU"
            author="William Shirer"
            hashtags={['Germany']}
          />
          <Book
            title="The Rise of Carry: The Dangerous Consequences of Volatility Suppression and the New Financial Order of Decaying Growth and Recurring Crisis"
            address="https://amzn.to/2GEHxZj"
            author="Tim Lee, Jamie Lee, Kevin Coldiron"
            hashtags={['economics', 'finance']}
          />
          <Book
            title="The Spider Network: The Wild Story of a Math Genius, a Gang of Backstabbing Bankers, and One of the Greatest Scams in Financial History"
            address="https://amzn.to/3p7P18x"
            author="David Enrich"
            hashtags={['fraud', 'finance']}
          />
          <Book
            title="Capital in the Twenty-First Century"
            address="https://amzn.to/2Ij3NZn"
            author="Thomas Piketty"
            hashtags={['economics', 'finance']}
          />
          <Book
            title="The Ascent of Money: A Financial History of the World"
            address="https://amzn.to/3ldlacn"
            author="Niall Ferguson"
            hashtags={['economics', 'finance']}
          />
          <Book
            title="Debt: The First 5,000 Years — Updated and Expanded"
            address="https://amzn.to/3k5otRH"
            author="David Graeber"
            hashtags={['economics', 'finance']}
          />
          <Book
            title="China's Second Continent: How a Million Migrants Are Building a New Empire in Africa"
            address="https://amzn.to/3l9DB1r"
            author="Howard French"
            hashtags={['China', 'Africa', 'economics']}
          />
          <Book
            title="The Other Half of Macroeconomics and the Fate of Globalization"
            address="https://amzn.to/3p9nfZ5"
            author="Richard Koo"
            hashtags={['economics']}
          />
          <Book
            title="Banking Secrecy and Global Finance: Economic and Political Issues"
            address="https://amzn.to/2I8IABA"
            author="Donato Masciandaro"
            hashtags={['banking', 'economics']}
          />
          <Book
            title="House of Niccolo Series"
            address="https://amzn.to/3lesioU"
            author="Dorothy Dunnett"
            hashtags={['banking', 'economics']}
          />
        </ul>
        <h3 id="investing">Investing:</h3>
        <ul>
          <Book
            title="University of Berkshire Hathaway: 30 Years of Lessons Learned from Warren Buffett & Charlie Munger at the Annual Shareholders Meeting"
            address="https://amzn.to/3paEQ2T"
            author="Daniel Pecaut"
            hashtags={['value']}
          />
          <Book
            title="Poor Charlie's Almanack: The Wit and Wisdom of Charles T. Munger"
            address="https://amzn.to/2U3bhBY"
            author="Peter Kaufman"
            hashtags={['value', 'biography']}
          />
          <Book
            title="The Intelligent Investor"
            address="https://amzn.to/3l993Nn"
            author="Ben Graham"
            hashtags={['value']}
          />
          <Book
            title="Invested: How I Learned to Master My Mind, My Fears, and My Money to Achieve Financial Freedom and Live a More Authentic Life"
            address="https://amzn.to/2IfbTlT"
            author="Phil Town"
            hashtags={['value']}
          />
          <Book
            title="The Dhandho Investor: The Low-Risk Value Method to High Returns"
            address="https://amzn.to/3eK2Rcw"
            author="Monish Pabrai"
            hashtags={['value']}
          />
          <Book
            title="Margin of Safety: Risk-Averse Value Investing Strategies for the Thoughtful Investor"
            address="https://amzn.to/2IkkDqk"
            author="Seth Klarman"
            hashtags={['value']}
          />
          <Book
            title="Security Analysis: Principles and Technique"
            address="https://amzn.to/3laRc90"
            author="Ben Graham"
            hashtags={['value']}
          />
          <Book
            title="Common Stocks and Uncommon Profits and Other Writings"
            address="https://amzn.to/38tUroe"
            author="Phil Fisher"
            hashtags={['stock']}
          />
          <Book
            title="The Man Who Solved the Market: How Jim Simons Launched the Quant Revolution"
            address="https://amzn.to/3n40Lao"
            author="Gregory Zuckerman"
            hashtags={['quant', 'JimSimons', 'biography']}
          />
          <Book
            title="The Quants: How a New Breed of Math Whizzes Conquered Wall Street and Nearly Destroyed It"
            address="https://amzn.to/2IiK4sX"
            author="Scott Patterson"
            hashtags={['quant', 'mathematics']}
          />
          <Book
            title="A Man for All Markets: From Las Vegas to Wall Street, How I Beat the Dealer and the Market"
            address="https://amzn.to/36lubdo"
            author="Edward O. Thorp"
            hashtags={['biography']}
          />
          <Book
            title="King of Capital: The Remarkable Rise, Fall, and Rise Again of Steve Schwarzman and Blackstone"
            address="https://amzn.to/2IfcjIZ"
            author="David Carey"
            hashtags={['Schwarzman', 'blackstone', 'biography']}
          />
          <Book
            title="The Mathematics of Gambling"
            address="https://amzn.to/3eJiHnB"
            author="Edward O. Thorp"
            hashtags={['mathematics', 'gambling']}
          />
          <Book
            title="The Mathematics of Games and Gambling"
            address="https://amzn.to/3p8vHIo"
            author="Edward Packel"
            hashtags={['mathematics', 'gambling']}
          />
          <Book
            title="Probability Guide to Gambling: The Mathematics of Dice, Slots, Roulette, Baccarat, Blackjack, Poker, Lottery and Sport Bets"
            address="https://amzn.to/3llZr1O"
            author="Catalin Barboianu"
            hashtags={['gambling']}
          />
          <Book
            title="Antifragile: Things That Gain from Disorder"
            address="https://amzn.to/35aSfjL"
            author="Nassim Taleb"
            hashtags={[]}
          />
          <Book
            title="Fooled by Randomness: The Hidden Role of Chance in Life and in the Markets"
            address="https://amzn.to/3l4RFtc"
            author="Nassim Taleb"
            hashtags={[]}
          />
          <Book
            title="Analysis of financial time series"
            address="https://www.amazon.com/Analysis-Financial-Time-Ruey-Tsay/dp/0470414359"
            author="Ruey S. Tsay"
            hashtags={['quant', 'trading', 'analysis', 'econometrics']}
          />
          <Book
            title="Options, Futures, and Other Derivatives"
            address="https://www.amazon.com/Options-Futures-Other-Derivatives-Tenth/dp/9352866592"
            author="John C. Hull"
            hashtags={['quant', 'derivatives']}
          />
          <Book
            title="Fixed Income Mathematics: Analytical and Statistical Techniques"
            address="https://www.amazon.com/Fixed-Income-Mathematics-Fifth-Statistical/dp/1264258275"
            author="Frank Fabozzi"
            hashtags={['quant', 'mathematics', 'statistics']}
          />
          <Book
            title="Financial Modeling of the Equity Market: From CAPM to Cointegration"
            address="https://www.amazon.com/Financial-Modeling-Equity-Market-Cointegration/dp/0471699004"
            author="Frank Fabozzi"
            hashtags={['quant', 'econometrics', 'modeling']}
          />
          <Book
            title="文明、现代化、价值投资与中国"
            address="https://item.jd.com/12638689.html"
            author="Li Lu"
            hashtags={['China', 'economics', 'history', 'investing']}
          />
        </ul>
        <h3 id="startup">Startup:</h3>
        <ul>
          <Book
            title="Zero to One"
            address="https://amzn.to/3k3w96Q"
            author="Peter Thiel"
            hashtags={['monopoly']}
          />
          <Book
            title="High Growth Handbook"
            address="https://amzn.to/3ezKSW6"
            author="Elad Gil"
            hashtags={['growth']}
          />
          <Book
            title="Hackers & Painters: Big Ideas from the Computer Age"
            address="https://amzn.to/2IfLfck"
            author="Paul Graham"
            hashtags={['yc']}
          />
          <Book
            title="Business Adventures: Twelve Classic Tales from the World of Wall Street"
            address="https://amzn.to/3k3wgPO"
            author="John Brooks"
            hashtags={['GatesNotes', 'sales']}
          />
          <Book
            title="Measure What Matters: How Google, Bono, and the Gates Foundation Rock the World with OKRs"
            address="https://amzn.to/356ek2S"
            author="John Doerr"
            hashtags={['metrics', 'data']}
          />
          <Book
            title="Scale: The Universal Laws of Growth, Innovation, Sustainability, and the Pace of Life in Organisms, Cities, Economies, and Companies"
            address="https://amzn.to/38kQqT4"
            author="Geoffrey West"
            hashtags={['growth']}
          />
          <Book
            title="Blitzscaling: The Lightning-Fast Path to Building Massively Valuable Companies"
            address="https://amzn.to/3ezLdIm"
            author="Reid Hoffman"
            hashtags={['LinkedIn', 'growth']}
          />
          <Book
            title="The Entrepreneur's Guide to Customer Development: A cheat sheet to The Four Steps to the Epiphany"
            address="https://amzn.to/2I9Jxcl"
            author="Brant Cooper"
            hashtags={['growth']}
          />
          <Book
            title="The Innovator's Dilemma: When New Technologies Cause Great Firms to Fail"
            address="https://amzn.to/2GHED64"
            author="Clayton M. Christensen"
            hashtags={['innovations']}
          />
          <Book
            title="Founding Sales"
            address="https://FoundingSales.com"
            author="Pete Kazanjy"
            hashtags={['growth', 'sales']}
          />
          <Book
            title="The Morando Method"
            address="https://amzn.to/3k9PMu2"
            author="Mitchell Morando"
            hashtags={['growth', 'sales']}
          />
          <Book
            title="Venture Deals: Be Smarter Than Your Lawyer and Venture Capitalist"
            address="https://amzn.to/3paRHC6"
            author="Brad Feld"
            hashtags={['fundraising', 'VC']}
          />
          <Book
            title="The Fundraising Rules"
            address="https://amzn.to/2JMiEfs"
            author="Mark Peter Davis"
            hashtags={['fundraising']}
          />
          <Book
            title="Secrets of Sand Hill Road: Venture Capital and How to Get It"
            address="https://amzn.to/2GHEKi0"
            author="Scott Kupor"
            hashtags={['fundraising', 'VC']}
          />
          <Book
            title="The Hardware Startup: Building Your Product, Business, and Brand"
            address="https://amzn.to/3n1PIy9"
            author="Renee DiResta, Brady Forrest, Ryan Vinyard "
            hashtags={['hardware']}
          />
          <Book
            title="The Hard Thing About Hard Things: Building a Business When There Are No Easy Answers"
            address="https://amzn.to/2IinAYt"
            author="Ben Horowitz"
            hashtags={['VC']}
          />
        </ul>
        <h3 id="leadership">Leadership / Management:</h3>
        <ul>
          <Book
            title="The Culture Code: The Secrets of Highly Successful Groups"
            address="https://amzn.to/2IeOYqQ"
            author="Daniel Coyle"
            hashtags={['management', 'culture']}
          />
          <Book
            title="What You Do Is Who You Are: How to Create Your Business Culture"
            address="https://amzn.to/3mZORyb"
            author="Ben Horowitz"
            hashtags={['management', 'culture', 'VC']}
          />
          <Book
            title="Trillion Dollar Coach: The Leadership Playbook of Silicon Valley's Bill Campbell"
            address="https://amzn.to/3pfW1Ar"
            author="Eric Schmidt "
            hashtags={['management', 'SiliconValley', 'Google']}
          />
          <Book
            title="The Making of a Manager: What to Do When Everyone Looks to You"
            address="https://amzn.to/32orsi0"
            author="Julie Zhuo"
            hashtags={['management', 'Facebook']}
          />
          <Book
            title="Radical Candor: Be a Kickass Boss Without Losing Your Humanity"
            address="https://amzn.to/3k7jUq0"
            author="Kim Scott"
            hashtags={['management']}
          />
          <Book
            title="The One Minute Manager"
            address="https://amzn.to/3l8rx0I"
            author="Ken Blanchard"
            hashtags={['management']}
          />
          <Book
            title="The Carolina Way: Leadership Lessons from a Life in Coaching"
            address="https://amzn.to/2Ie15Es"
            author="Dean Smith"
            hashtags={['leadership', 'sports']}
          />
          <Book
            title="It's Your Ship: Management Techniques from the Best Damn Ship in the Navy"
            address="https://amzn.to/2JNTaOM"
            author="Captain D. Michael Abrashoff"
            hashtags={['leadership', 'military']}
          />
          <Book
            title="Plain Talk"
            address="https://amzn.to/2U6eAZm"
            author="Ken Iverson"
            hashtags={['leadership']}
          />
        </ul>
        <h3 id="biography">Biography:</h3>
        <ul>
          <Book
            title="Lee Kuan Yew"
            address="https://amzn.to/2I5HsyD"
            author="Graham Allison"
            hashtags={['Singapore', 'politics']}
          />
          <Book
            title="Steve Jobs"
            address="https://amzn.to/3eCBgcZ"
            author="Walter Isaacson"
            hashtags={['United States', 'tech', 'Apple']}
          />
          <Book
            title="Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future"
            address="https://amzn.to/2Ibb5Oy"
            author="Ashlee Vance"
            hashtags={['United States', 'tech', 'energy', 'Tesla', 'SpaceX']}
          />
          <Book
            title="Sons of Wichita: How the Koch Brothers Became America's Most Powerful and Private Dynasty"
            address="https://amzn.to/3l9oup5"
            author="Daniel Schulman"
            hashtags={['United States', 'politics']}
          />
          <Book
            title="Kochland: The Secret History of Koch Industries and Corporate Power in America"
            address="https://amzn.to/3n6VJKf"
            author="Christopher Leonard"
            hashtags={['United States', 'politics']}
          />
          <Book
            title="King Icahn: The Biography of a Renegade Capitalist"
            address="https://amzn.to/3lbHovd"
            author="Mark Stevens"
            hashtags={['United States', 'finance', 'politics']}
          />
          <Book
            title="MBS: The Rise to Power of Mohammed bin Salman"
            address="https://amzn.to/36cb8lG"
            author="Ben Hubbard"
            hashtags={['SaudiArabia', 'politics']}
          />
          <Book
            title="The Polyester Prince: The Rise of Dhirubhai Ambani"
            address="https://amzn.to/32kKC8f"
            author="Hamish McDonald"
            hashtags={['India', 'reliance']}
          />
          <Book
            title="The Billionaire Raj: A Journey Through India's New Gilded Age"
            address="https://amzn.to/35aRLtY"
            author="James Crabtree"
            hashtags={['India']}
          />
          <Book
            title="Billion Dollar Whale: The Man Who Fooled Wall Street, Hollywood, and the World"
            address="https://amzn.to/3lbHyCP"
            author="Bradley Hope"
            hashtags={[
              'Malaysia',
              'UAE',
              '1mdb',
              'SovereignWealthFund',
              'fraud',
            ]}
          />
          <Book
            title="Bad Blood: Secrets and Lies in a Silicon Valley Startup"
            address="https://amzn.to/2GD7s3p"
            author="John Carreyrou"
            hashtags={['United States', 'ElizabethHolmes', 'fraud']}
          />
          <Book
            title="Kingpin: How One Hacker Took Over the Billion-Dollar Cybercrime Underground"
            address="https://amzn.to/2JJnCtf"
            author="Kevin Poulson"
            hashtags={['hacker', 'crime']}
          />
          <Book
            title="Ghost in the Wires: My Adventures as the World's Most Wanted Hacker"
            address="https://amzn.to/356xDsE"
            author="Kevin Mitnick"
            hashtags={['tech', 'hacker']}
          />
          <Book
            title="Endurance: Shackleton's Incredible Voyage to the Antarctic"
            address="https://amzn.to/2Uim8bH"
            author="Alfred Lansing"
            hashtags={['navigation', 'Antarctica']}
          />
          <Book
            title="Benjamin Franklin: An American Life"
            address="https://amzn.to/3lezGRa"
            author="Walter Isaacson"
            hashtags={['United States', 'politics', 'inventor']}
          />
          <Book
            title="Alexander Hamilton"
            address="https://amzn.to/3laUgSz"
            author="Ron Chernow"
            hashtags={['United States', 'politics']}
          />
          <Book
            title="Einstein: His Life and Universe"
            address="https://amzn.to/32oquCx"
            author="Walter Isaacson"
            hashtags={['United States', 'physics']}
          />
          <Book
            title="Genius: The Life and Science of Richard Feynman"
            address="https://amzn.to/38iWgVb"
            author="James Gleick"
            hashtags={['United States', 'physics']}
          />
          <Book
            title="Titan: The Life of John D. Rockefeller, Sr."
            address="https://amzn.to/3n2u64P"
            author="Ron Chernow"
            hashtags={['United States', 'oil']}
          />
          <Book
            title="The House of Morgan: An American Banking Dynasty and the Rise of Modern Finance"
            address="https://amzn.to/3p8sAQA"
            author="Ron Chernow"
            hashtags={['United States', 'finance', 'banking']}
          />
          <Book
            title="Andrew Carnegie"
            address="https://amzn.to/3k8J4o9"
            author="David Nasaw"
            hashtags={['United States', 'finance', 'oil']}
          />
        </ul>
        <h3 id="industries">Industries:</h3>
        <ul>
          <Book
            title="The Song Machine: Inside the Hit Factory"
            address="https://amzn.to/3eJsf1V"
            author="John Seabrook"
            hashtags={['music']}
          />
          <Book
            title="The Mirage Factory: Illusion, Imagination, and the Invention of Los Angeles"
            address="https://amzn.to/2U7c1Gy"
            author="Gary Krist"
            hashtags={['film']}
          />
          <Book
            title="Powerhouse: The Untold Story of Hollywood's Creative Artists Agency"
            address="https://amzn.to/356u8T4"
            author="James Miller"
            hashtags={['film', 'hollywood']}
          />
          <Book
            title="Blackwater: The Rise of the World's Most Powerful Mercenary Army"
            address="https://amzn.to/32osPxj"
            author="Jeremy Scahill"
            hashtags={['blackwater', 'military']}
          />
          <Book
            title="The Cartiers: The Untold Story of the Family Behind the Jewelry Empire"
            address="https://amzn.to/3p7yZvo"
            author="Francesca Cartier Brickell"
            hashtags={['jewelry']}
          />
          <Book
            title="Stoned: Jewelry, Obsession, and How Desire Shapes the World"
            address="https://amzn.to/32jNcLZ"
            author="Aja Raden"
            hashtags={['jewelry']}
          />
          <Book
            title="Boom: Mad Money, Mega Dealers, and the Rise of Contemporary Art"
            address="https://amzn.to/36ayo3k"
            author="Michael Shnayerson"
            hashtags={['art']}
          />
          <Book
            title="The Ride of a Lifetime: Lessons Learned from 15 Years as CEO of the Walt Disney Company"
            address="https://amzn.to/38nysPO"
            author="Robert Iger"
            hashtags={['film', 'disney']}
          />
          <Book
            title="Pour Your Heart Into It: How Starbucks Built a Company One Cup at a Time"
            address="https://amzn.to/38lQAcZ"
            author="Howard Schultz"
            hashtags={['retail', 'starbucks']}
          />
          <Book
            title="Shoe Dog: A Memoir by the Creator of Nike"
            address="https://amzn.to/3p766PV"
            author="Phil Knight"
            hashtags={['retail', 'nike']}
          />
          <Book
            title="The Everything Store: Jeff Bezos and the Age of Amazon"
            address="https://amzn.to/2GERJRz"
            author="Brad Stone"
            hashtags={['retail', 'amazon']}
          />
          <Book
            title="Working Backwards: Insights, Stories, and Secrets from Inside Amazon"
            address="https://www.amazon.com/Working-Backwards-Insights-Stories-Secrets/dp/1250267595"
            author="Collin Bryar, Bill Carr"
            hashtags={['retail', 'amazon', 'kindle', 'aws', 'prime']}
          />
          <Book
            title="One Up: Creativity, Competition, and the Global Business of Video Games"
            address="https://www.amazon.com/One-Up-Creativity-Competition-Business/dp/0231197527"
            author="Joost van Dreunen"
            hashtags={['video games', 'e-sports']}
          />
          <Book
            title="BARE ESSENTIALS: The ALDI Way to Retail Success"
            address="https://amzn.to/3lbllF0"
            author="Dieter Brandes"
            hashtags={['retail', 'aldi']}
          />
          <Book
            title="Alibaba: The House That Jack Ma Built"
            address="https://amzn.to/2IjaaMe"
            author="Duncan Clark"
            hashtags={['alibaba', 'China']}
          />
          <Book
            title="Empire State of Mind: How Jay-Z Went From Street Corner to Corner Office"
            address="https://amzn.to/3eAO83i"
            author="Zack Greenburg"
            hashtags={['music', 'jay-z']}
          />
          <Book
            title="The Idea Factory: Bell Labs and the Great Age of American Innovation"
            address="https://amzn.to/3eKckk4"
            author="Jon Gertner"
            hashtags={['tech', 'Bell Labs', 'Silicon Valley']}
          />
          <Book
            title="Empires of Light: Edison, Tesla, Westinghouse, and the Race to Electrify the World"
            address="https://amzn.to/3lateuu"
            author="Jill Jonnes"
            hashtags={['electricity', 'energy']}
          />
          <Book
            title="The Powerhouse: America, China, and the Great Battery War"
            address="https://amzn.to/2Ie4AL6"
            author="Steve Levine"
            hashtags={['battery', 'electricity', 'energy']}
          />
          <Book
            title="Wind Power: The Struggle for Control of a New Global Industry"
            address="https://amzn.to/3n4bphm"
            author="Ben Backwell"
            hashtags={['wind', 'energy']}
          />
          <Book
            title="Uranium: War, Energy and the Rock That Shaped the World"
            address="https://amzn.to/35933Pl"
            author="Tom Zoellner"
            hashtags={['nuclear', 'energy']}
          />
          <Book
            title="How to Make a Spaceship: A Band of Renegades, an Epic Race, and the Birth of Private Spaceflight"
            address="https://amzn.to/359jRG0"
            author="Julian Guthrie"
            hashtags={['space']}
          />
          <Book
            title="Bottle of Lies: The Inside Story of the Generic Drug Boom"
            address="https://amzn.to/2IcSSjN"
            author="Katherine Eban"
            hashtags={['medicine']}
          />
          <Book
            title="Germ Theory: Medical Pioneers in Infectious Diseases"
            address="https://amzn.to/3mWNzns"
            author="Robert Gaynes"
            hashtags={['biology', 'medicine']}
          />
          <Book
            title="Plastic: A Toxic Love Story"
            address="https://amzn.to/3k3BqLG"
            author="Susan Freinkel"
            hashtags={['infrastructure', 'material']}
          />
          <Book
            title="Concrete Planet: The Strange and Fascinating Story of the World's Most Common Man-Made Material"
            address="https://amzn.to/3paOO4j"
            author="Robert Courland"
            hashtags={['infrastructure', 'material']}
          />
          <Book
            title="Steel: From Mine to Mill, the Metal that Made America"
            address="https://amzn.to/3eOv7uF"
            author="Brooke Stoddard"
            hashtags={['infrastructure', 'steel', 'material']}
          />
          <Book
            title="Ninety Percent of Everything: Inside Shipping, the Invisible Industry That Puts Clothes on Your Back, Gas in Your Car, and Food on Your Plate"
            address="https://amzn.to/3p9H02Y"
            author="Rose George"
            hashtags={['logicstics', 'shipping']}
          />
          <Book
            title="The Box: How the Shipping Container Made the World Smaller and the World Economy Bigger"
            address="https://amzn.to/2JMnbP0"
            author="Marc Levinson"
            hashtags={['logicstics', 'shipping']}
          />
          <Book
            title="Napoleon's Buttons: How 17 Molecules Changed History"
            address="https://amzn.to/2I8T4kq"
            author="Penny Couteur"
            hashtags={['chemistry', 'material']}
          />
          <Book
            title="A History of World Agriculture: From the Neolithic Age to the Current Crisis"
            address="https://amzn.to/38j0mwx"
            author="Marcel Mazoyer"
            hashtags={['agriculture', 'history']}
          />
          <Book
            title="The Sugar Barons: Family, Corruption, Empire, and War in the West Indies"
            address="https://amzn.to/2Ig91oB"
            author="Matthew Parker"
            hashtags={['agriculture', 'sugar', 'history']}
          />
          <Book
            title="Cotton: The Biography of a Revolutionary Fiber"
            address="https://amzn.to/38hvbSi"
            author="Stephen Yafa"
            hashtags={['agriculture', 'food', 'history']}
          />
          <Book
            title="Slaughterhouse: The Shocking Story of Greed, Neglect, And Inhumane Treatment Inside the U.S. Meat Industry"
            address="https://amzn.to/3p7hWtc"
            author="Gail Eisnitz"
            hashtags={['meat', 'food']}
          />
          <Book
            title="Samsung Rising: The Inside Story of the South Korean Giant That Set Out to Beat Apple and Conquer Tech"
            address="https://amzn.to/38o4Kua"
            author="Geoffrey Cain"
            hashtags={['tech', 'chips', 'samsung']}
          />
          <Book
            title="Cage Kings"
            address="https://www.amazon.com/Cage-Kings-Unlikely-Champions-Transformed/dp/1501198475"
            author="Michael Thomsen"
            hashtags={['sports', 'ufc']}
          />
        </ul>
      </div>
    </Fragment>
  );
}

export default books;
