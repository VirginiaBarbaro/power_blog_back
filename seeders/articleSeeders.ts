import dotenv from "dotenv";
dotenv.config();
import db from "../database/db";

const articleSeeders = async () => {
  const articles = [
    /* Nature */
    {
      title: "Exploring the Wonders of Marine Biodiversity",
      headline: "New Species Discovered in Deep Ocean Trench",
      content:
        "Marine biodiversity is a fascinating subject that continues to captivate scientists and researchers around the world. The oceans are teeming with an incredible variety of life, from microscopic plankton to massive whales. Exploring the wonders of marine biodiversity involves studying the intricate ecosystems, understanding the interconnections between species, and uncovering the adaptations that enable marine life to thrive in diverse environments. Through exploration and scientific research, we gain insights into the importance of preserving and protecting these delicate ecosystems for future generations. The discoveries made in deep-sea trenches and coral reefs provide valuable knowledge that contributes to our understanding of the vast marine world and the vital role it plays in sustaining life on Earth.",
      image: ["/nature/art1.png"],
      userId: 1,
      categoryId: 5,
    },
    {
      title: "Unveiling the Marvels of Underwater Biodiversity",
      headline: "Rare Species Found in Mysterious Oceanic Chasms",
      content:
        "The diversity of marine life is an awe-inspiring realm that continues to captivate scientists and researchers globally. From the tiniest of organisms like microalgae to majestic creatures such as humpback whales, the oceans host a mesmerizing array of species. Delving into the marvels of underwater biodiversity entails the study of intricate ecosystems, unraveling the interconnectedness between organisms, and discovering the incredible adaptations that allow marine organisms to thrive in various habitats. Through systematic exploration and dedicated scientific inquiry, we gain profound insights into the imperative of preserving and safeguarding these fragile ecosystems for future generations. The revelations stemming from exploring deep-sea canyons and vibrant coral reefs provide invaluable wisdom, contributing to our comprehension of the vast aquatic world and its indispensable role in sustaining life on our planet.",
      image: ["/nature/art2.png"],

      userId: 1,
      categoryId: 5,
    },
    {
      title: "The Importance of Forest Conservation",
      headline: "Protecting our Forests for a Sustainable Future",
      content:
        "Forests play a crucial role in maintaining the health of our planet. They provide habitat for countless species, regulate the climate, purify the air we breathe, and offer a multitude of resources for human well-being. However, deforestation and unsustainable practices pose a significant threat to our forests. It is essential to prioritize forest conservation efforts, promote sustainable forestry practices, and raise awareness about the importance of preserving these valuable ecosystems. By protecting our forests, we can safeguard biodiversity, mitigate climate change, and ensure a sustainable future for generations to come.",
      image: ["/nature/art3.png"],

      userId: 1,
      categoryId: 5,
    },
    {
      title: "Exploring Coral Reefs: A World of Biodiversity",
      headline: "Discovering the Hidden Wonders Beneath the Waves",
      content:
        "Coral reefs are among the most diverse ecosystems on Earth, teeming with an incredible array of marine life. They provide habitat for countless species, protect coastlines from erosion, and support local economies through tourism and fisheries. However, coral reefs are under threat from climate change, pollution, and destructive fishing practices. Exploring these fragile underwater ecosystems allows us to appreciate their beauty, understand their ecological importance, and work towards their conservation. By taking steps to protect coral reefs and their surrounding environments, we can preserve their biodiversity and ensure the survival of these incredible underwater wonders.",
      image: ["/nature/art4.png"],

      userId: 1,
      categoryId: 5,
    },
    {
      title: "The Marvels of Bird Migration",
      headline: "Unraveling the Extraordinary Journeys of Avian Travelers",
      content:
        "Bird migration is a remarkable phenomenon that captivates scientists and birdwatchers alike. Each year, billions of birds undertake incredible journeys, crossing continents and oceans in search of food, breeding grounds, and favorable climates. These epic migrations require precise navigational abilities and tremendous endurance. Studying bird migration provides insights into avian behavior, population dynamics, and global ecological connections. However, migratory birds face numerous challenges, including habitat loss, climate change, and collisions with human structures. Protecting critical stopover sites and creating conservation measures are crucial for ensuring the survival of migratory bird species and maintaining the intricate balance of our natural world.",
      image: ["/nature/art5.png"],

      userId: 1,
      categoryId: 5,
    },
    /* Tech */
    {
      title: "The Rise of Artificial Intelligence in Everyday Life",
      headline: "How AI is Transforming Industries and Enhancing User Experience",
      content:
        "Artificial intelligence (AI) is revolutionizing various aspects of our lives. From virtual assistants and autonomous vehicles to personalized recommendations and healthcare advancements, AI is driving innovation across industries. Machine learning algorithms enable computers to learn from data and make intelligent decisions, leading to improved efficiency and user experience. However, ethical considerations and responsible AI development are essential to ensure privacy, fairness, and transparency. As AI continues to evolve, its integration into everyday life has the potential to shape our future in unprecedented ways.",
      image: ["/tech/art6.png"],
      userId: 2,
      categoryId: 4,
    },
    {
      title: "The Power of Big Data Analytics",
      headline: "Unleashing Insights and Opportunities for Businesses",
      content:
        "In today's data-driven world, big data analytics is playing a crucial role in helping businesses gain valuable insights and make informed decisions. By analyzing large and complex datasets, companies can identify patterns, trends, and correlations that lead to actionable intelligence. Big data analytics is transforming industries such as finance, marketing, healthcare, and manufacturing, enabling organizations to optimize operations, improve customer experiences, and drive innovation. However, effective data governance, security, and privacy measures are vital to address the challenges and ethical considerations associated with big data.",
      image: ["/tech/art7.png"],
      userId: 2,
      categoryId: 4,
    },
    {
      title: "The Evolution of Cloud Computing",
      headline: "From Infrastructure to Platform and Software Services",
      content:
        "Cloud computing has revolutionized the way businesses and individuals access and utilize technology resources. The shift from on-premises infrastructure to cloud-based services offers scalability, flexibility, and cost-efficiency. Cloud providers offer a range of services, including infrastructure as a service (IaaS), platform as a service (PaaS), and software as a service (SaaS). This evolution has enabled organizations to focus on innovation and digital transformation, leveraging cloud solutions to enhance productivity, collaboration, and agility. However, considerations such as data security, vendor lock-in, and regulatory compliance must be addressed when adopting cloud technologies.",
      image: ["/tech/art8.jpeg"],
      userId: 1,
      categoryId: 4,
    },
    {
      title: "The Impact of Blockchain Technology on Industries",
      headline: "Transforming Trust, Security, and Efficiency",
      content:
        "Blockchain technology has gained significant attention for its potential to revolutionize various industries. By providing a decentralized and immutable ledger, blockchain offers enhanced trust, security, and transparency in areas such as finance, supply chain management, healthcare, and voting systems. Smart contracts enable automated and tamper-proof execution of agreements, streamlining processes and reducing intermediaries. While blockchain holds great promise, challenges related to scalability, energy consumption, and regulatory frameworks need to be addressed for widespread adoption. As the technology matures, its impact on industries is expected to grow exponentially.",
      image: ["/tech/art9.png"],
      userId: 2,
      categoryId: 4,
    },
    {
      title: "The Future of Internet of Things (IoT)",
      headline: "Connecting the Physical and Digital Worlds",
      content:
        "The Internet of Things (IoT) is poised to revolutionize how we interact with the world around us. By connecting everyday objects and devices to the internet, IoT enables seamless communication, automation, and data exchange. Smart homes, connected cars, and industrial IoT applications are just a few examples of how IoT is transforming various domains. However, concerns regarding privacy, data security, and interoperability need to be addressed to fully unlock the potential of IoT. As the technology advances, the future of IoT holds immense possibilities for innovation, efficiency, and improved quality of life.",
      image: ["/tech/art10.png"],
      userId: 1,
      categoryId: 4,
    },
    /* Fashion */
    {
      title: "The Ever-Evolving World of Fashion Trends",
      headline: "Exploring the Latest Style Statements and Influences",
      content:
        "Fashion trends are constantly changing, reflecting the evolving tastes and preferences of consumers. From runway shows to street style, fashion influencers play a crucial role in shaping the latest trends. The fashion industry embraces diversity, sustainability, and inclusivity as key influencers in contemporary fashion. Designers experiment with innovative materials and techniques to create unique and environmentally conscious garments. By staying attuned to fashion trends, individuals can express their personal style while embracing the dynamic nature of the fashion world.",
      image: ["/fashion/art11.png"],
      userId: 1,
      categoryId: 2,
    },
    {
      title: "The Impact of Sustainable Fashion",
      headline: "Fostering Ethical Practices and Environmental Responsibility",
      content:
        "Sustainable fashion is gaining momentum as consumers seek more ethical and eco-friendly clothing options. From eco-conscious materials to fair trade practices, sustainable fashion encompasses various aspects of responsible production and consumption. Fashion brands are embracing transparency, circularity, and upcycling to reduce their environmental footprint. By supporting sustainable fashion, individuals contribute to positive change in the industry and promote a more sustainable future. Choosing quality, timeless pieces and supporting ethical brands are essential steps in building a more sustainable and conscious wardrobe.",
      image: ["/fashion/art12.png"],
      userId: 1,
      categoryId: 2,
    },
    {
      title: "The Evolution of Haute Couture",
      headline: "From Historical Elegance to Modern Masterpieces",
      content:
        "Haute couture represents the pinnacle of fashion craftsmanship and creativity. Originating in 19th-century Paris, haute couture embodies the art of creating custom-made, high-fashion garments. Today, haute couture continues to captivate with its intricate designs, luxurious fabrics, and meticulous handwork. Fashion houses push boundaries with avant-garde creations while maintaining the heritage of craftsmanship. Haute couture serves as a source of inspiration for ready-to-wear collections and influences the direction of fashion trends, showcasing the ongoing fusion of tradition and innovation in the world of fashion.",
      image: ["/fashion/art13.png"],
      userId: 1,
      categoryId: 2,
    },
    {
      title: "The Influence of Street Style Fashion",
      headline: "How Streetwear Transformed Fashion Culture",
      content:
        "Street style fashion has emerged as a powerful force, reshaping the fashion landscape. Originating from urban subcultures, streetwear blends elements of music, art, and individual expression. It has transcended traditional fashion boundaries and become a mainstream phenomenon, with collaborations between high-end designers and streetwear brands. Street style influencers and social media have played a significant role in amplifying its impact. The democratization of fashion through streetwear has allowed for more inclusivity and diversity in the industry, reflecting the unique identities and voices of individuals.",
      image: ["/fashion/art14.png"],
      userId: 2,
      categoryId: 2,
    },
    {
      title: "The Enduring Allure of Vintage Fashion",
      headline: "Exploring the Timeless Appeal of Retro Styles",
      content:
        "Vintage fashion continues to captivate fashion enthusiasts with its timeless appeal and unique character. From iconic fashion eras like the 1920s to the 1990s, vintage garments evoke nostalgia and individuality. Vintage enthusiasts seek out one-of-a-kind pieces, appreciating the craftsmanship and stories behind them. The sustainability aspect of vintage fashion is also appealing, as it promotes reusing and recycling clothing. Whether it's a vintage find or a modern reinterpretation, incorporating vintage elements into personal style allows for a distinctive and timeless fashion statement.",
      image: ["/fashion/art15.png"],
      userId: 1,
      categoryId: 2,
    },
    /* Finance */
    {
      title: "Navigating the World of Personal Finance",
      headline: "Tips for Budgeting, Saving, and Building Wealth",
      content:
        "Managing personal finances is crucial for achieving financial stability and long-term goals. Creating a budget helps track income and expenses, allowing individuals to make informed financial decisions. Saving and investing wisely are key to building wealth and securing a comfortable future. It's essential to develop good financial habits, such as avoiding excessive debt and maintaining an emergency fund. Understanding financial concepts like compound interest and diversification can help individuals make informed investment choices. By taking control of personal finances, individuals can work towards financial independence and achieve their financial aspirations.",
      image: ["/finance/art16.png"],
      userId: 1,
      categoryId: 1,
    },
    {
      title: "The Role of Financial Technology (FinTech)",
      headline: "Transforming Banking, Payments, and Investment",
      content:
        "Financial technology, or FinTech, is revolutionizing the financial industry by leveraging technology to provide innovative financial services. Mobile banking, digital payments, and robo-advisors are just a few examples of how FinTech is reshaping the way individuals manage their finances. FinTech companies are streamlining processes, increasing accessibility, and offering personalized solutions to consumers. However, with the rise of FinTech, considerations such as data security, privacy, and regulatory compliance become crucial. The continued growth of FinTech is expected to drive further disruption and innovation in the financial sector.",
      image: ["/finance/art17.png"],
      userId: 1,
      categoryId: 1,
    },
    {
      title: "Understanding the Basics of Investment",
      headline: "Building Wealth through Stocks, Bonds, and Funds",
      content:
        "Investing is a fundamental aspect of wealth-building and achieving long-term financial goals. Stocks, bonds, and mutual funds offer individuals the opportunity to participate in the financial markets and potentially earn returns. Diversification, asset allocation, and risk management are key principles to consider when creating an investment portfolio. It's essential to understand investment options, research potential investments, and stay informed about market trends. While investing carries inherent risks, it also offers the potential for growth and wealth accumulation over time.",
      image: ["/finance/art18.png"],
      userId: 2,
      categoryId: 1,
    },
    {
      title: "The Importance of Financial Planning",
      headline: "Preparing for Future Expenses and Financial Security",
      content:
        "Financial planning is essential for individuals and families to achieve their financial goals and secure their future. It involves setting financial objectives, creating a budget, and developing a strategy to manage income, expenses, and savings. Financial planning encompasses various aspects, including retirement planning, insurance coverage, tax planning, and estate planning. Seeking professional guidance from financial advisors can provide valuable insights and expertise. By implementing a comprehensive financial plan, individuals can make informed decisions and work towards a financially secure future.",
      image: ["/finance/art19.png"],
      userId: 1,
      categoryId: 1,
    },
    {
      title: "The Impact of Global Economic Trends",
      headline: "Understanding Factors that Shape the Global Economy",
      content:
        "Global economic trends play a significant role in shaping the business landscape and impacting individuals worldwide. Factors such as economic growth, inflation, interest rates, and geopolitical events influence financial markets and investment decisions. Understanding these trends helps individuals and businesses navigate potential risks and identify opportunities. Economic indicators and reports provide insights into the health of economies and guide decision-making. Staying informed about global economic trends enables individuals to make informed financial choices and adapt to changing market conditions.",
      image: ["/finance/art20.png"],
      userId: 2,
      categoryId: 1,
    },
    /* Gaming */
    {
      title: "The Evolution of Gaming Consoles",
      headline: "From Retro Classics to Next-Generation Systems",
      content:
        "Gaming consoles have come a long way since the early days of Pong and Atari. From iconic systems like the Nintendo Entertainment System (NES) to the latest PlayStation and Xbox consoles, gaming technology has evolved exponentially. Modern consoles offer immersive graphics, realistic gameplay, and online multiplayer experiences. They have become entertainment hubs, integrating streaming services and social features. The gaming industry continues to push the boundaries of technology, delivering new gaming experiences and shaping the future of interactive entertainment.",
      image: ["/gaming/art21.png"],
      userId: 1,
      categoryId: 3,
    },
    {
      title: "The Rise of Esports",
      headline: "Competitive Gaming as a Global Phenomenon",
      content:
        "Esports, or competitive gaming, has gained immense popularity worldwide. Professional esports teams, tournaments, and leagues attract millions of viewers and offer substantial prize pools. Games like League of Legends, Dota 2, and Fortnite have become global esports sensations. Esports events fill stadiums, and players compete for fame, fortune, and sponsorships. The rise of streaming platforms like Twitch has made esports accessible to a broader audience. Esports' rapid growth has transformed gaming into a professional, highly competitive industry.",
      image: ["/gaming/art22.png"],

      userId: 1,
      categoryId: 3,
    },
    {
      title: "Exploring Virtual Reality (VR) Gaming",
      headline: "Immersive Experiences in a Virtual World",
      content:
        "Virtual Reality (VR) gaming offers an entirely new level of immersion and interactivity. With VR headsets, players can step into virtual worlds and experience games in a whole new way. The technology tracks head movements and provides a 360-degree view, creating a sense of presence and realism. VR gaming extends beyond traditional genres, allowing players to explore new types of experiences and gameplay mechanics. While still evolving, VR gaming has the potential to revolutionize the gaming industry and redefine how we interact with digital entertainment.",
      image: ["/gaming/art23.png"],
      userId: 2,
      categoryId: 3,
    },
    {
      title: "The Influence of Gaming on Popular Culture",
      headline: "From Movies to Fashion: Gaming's Impact",
      content:
        "Gaming has transcended its origins to become a major influence on popular culture. Video game franchises like Super Mario, Pokémon, and The Legend of Zelda have become iconic symbols recognized by millions worldwide. Gaming has inspired movies, TV shows, music, and even fashion trends. Cosplay, the art of dressing up as game characters, has gained a dedicated following. Gaming has also shaped social interactions, with multiplayer games fostering communities and friendships. The impact of gaming on popular culture continues to grow as the medium evolves and reaches new audiences.",
      image: ["/gaming/art24.png"],
      userId: 1,
      categoryId: 3,
    },
    {
      title: "The Benefits of Gaming",
      headline: "Exploring the Positive Effects of Gaming",
      content:
        "Gaming offers more than entertainment; it has various positive effects on individuals. Video games can improve cognitive skills, problem-solving abilities, and hand-eye coordination. They can also promote teamwork and social interaction through multiplayer experiences. Gaming communities provide spaces for like-minded individuals to connect and share experiences. Moreover, some games incorporate educational elements, teaching players about history, science, and other subjects. While moderation and responsible gaming practices are essential, gaming can provide meaningful experiences and benefits to players of all ages.",
      image: ["/gaming/art25.png"],
      userId: 2,
      categoryId: 3,
    },
  ];
  await db.Article.bulkCreate(articles);
  console.log("[DB] Se corrieron los seeders de article");
};

export default articleSeeders;
