// pages/blog/building-your-first-ai-chatbot-python-tutorial.js
import Head from 'next/head';
import Link from 'next/link';

export default function BuildingYourFirstAiChatbotPythonTutorial() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Building Your First AI Chatbot — A Python Tutorial for Beginners',
        item: 'https://dev-brains-ai.com/blog/building-your-first-ai-chatbot-python-tutorial',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Building Your First AI Chatbot — A Python Tutorial for Beginners',
    description:
      'A step-by-step beginner tutorial for building a simple rule-based and API-based chatbot in Python, with real working code you can run today.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/building-your-first-ai-chatbot-python-tutorial',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the easiest way to build a chatbot in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The easiest way is to start with a rule-based chatbot using simple keyword matching or the Python NLTK library, then progress to an API-based chatbot that calls an LLM API for open-ended responses once you understand the basic request-response loop.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need machine learning knowledge to build a basic chatbot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A rule-based or intent-matching chatbot can be built with basic Python and string matching, no machine learning required. ML or an LLM API becomes useful only when you want the chatbot to handle open-ended, unscripted conversation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Python libraries are commonly used for chatbots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common choices are NLTK for basic text processing and pattern matching, scikit-learn for a lightweight intent classifier, and the requests library or an official SDK to call an LLM API such as OpenAI or Anthropic for more natural, open-ended responses.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Building Your First AI Chatbot — A Python Tutorial for Beginners | Dev Brains AI</title>
        <meta
          name="description"
          content="Step-by-step beginner tutorial building a simple rule-based or API-based chatbot in Python, with real working code you can run today."
        />
        <meta
          name="keywords"
          content="build a chatbot in python, python chatbot tutorial, ai chatbot tutorial beginners, rule based chatbot python, simple chatbot python code"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/building-your-first-ai-chatbot-python-tutorial" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Building Your First AI Chatbot in Python</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Building Your First AI Chatbot — A Python Tutorial for Beginners
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            You do not need a machine learning degree to build a working chatbot. This tutorial walks
            through two real, runnable versions: a simple rule-based chatbot using pure Python, and an
            upgraded version that calls an LLM API for open-ended responses. By the end you will have
            working code and understand exactly what each piece does.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 1: A Simple Rule-Based Chatbot
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The simplest chatbot matches keywords in user input to predefined responses. No
            dependencies needed beyond core Python.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# rule_based_bot.py
def get_response(user_input):
    text = user_input.lower()

    if "hello" in text or "hi" in text:
        return "Hey there! How can I help you today?"
    elif "hours" in text or "timing" in text:
        return "We're open Monday to Saturday, 9 AM to 6 PM."
    elif "price" in text or "cost" in text:
        return "Our plans start at ₹499/month. Want details on a specific plan?"
    elif "bye" in text:
        return "Goodbye! Have a great day."
    else:
        return "Sorry, I didn't understand that. Could you rephrase?"

print("Bot: Hi! Type 'bye' to exit.")
while True:
    user_input = input("You: ")
    if "bye" in user_input.lower():
        print("Bot:", get_response(user_input))
        break
    print("Bot:", get_response(user_input))`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This works for a narrow, predictable use case (FAQ bots) but breaks down quickly once
            users phrase things in ways you did not anticipate.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 2: Add Intent Matching with a Classifier
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Instead of hardcoded `if/elif` checks, train a lightweight classifier on sample phrases
            per intent — this generalizes much better to varied phrasing.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# intent_bot.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC

training_data = [
    ("hi there", "greeting"), ("hello", "greeting"), ("good morning", "greeting"),
    ("what are your hours", "hours"), ("when are you open", "hours"),
    ("how much does it cost", "price"), ("what's the pricing", "price"),
    ("bye", "goodbye"), ("see you later", "goodbye"),
]

responses = {
    "greeting": "Hey there! How can I help you today?",
    "hours": "We're open Monday to Saturday, 9 AM to 6 PM.",
    "price": "Our plans start at ₹499/month.",
    "goodbye": "Goodbye! Have a great day.",
}

texts, labels = zip(*training_data)
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

model = SVC(kernel="linear", probability=True)
model.fit(X, labels)

def get_response(user_input):
    X_input = vectorizer.transform([user_input])
    intent = model.predict(X_input)[0]
    return responses.get(intent, "Sorry, I didn't understand that.")

print(get_response("what time do you open"))  # -> hours response`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 3: Upgrade to an LLM-Powered Chatbot
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For genuinely open-ended conversation, call an LLM API instead of matching intents.
            This handles phrasing you never anticipated.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# llm_bot.py
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

conversation_history = []

def get_response(user_input):
    conversation_history.append({"role": "user", "content": user_input})
    response = client.messages.create(
        model="claude-3-5-haiku-20241022",
        max_tokens=300,
        system="You are a helpful customer support assistant for a small SaaS company.",
        messages=conversation_history,
    )
    reply = response.content[0].text
    conversation_history.append({"role": "assistant", "content": reply})
    return reply

print("Bot: Hi! Ask me anything. Type 'bye' to exit.")
while True:
    user_input = input("You: ")
    if user_input.lower() == "bye":
        break
    print("Bot:", get_response(user_input))`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Keeping `conversation_history` and passing it back on every call is what gives the bot
            memory of earlier turns in the conversation — without it, every message would be treated
            as a fresh, context-free question.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Choosing the Right Approach for Your Project
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Rule-based</strong> — best for a narrow, predictable FAQ bot with a handful of fixed intents and zero API cost</li>
            <li><strong>Intent classifier</strong> — best when you have more varied phrasing but still a fixed, known set of possible intents</li>
            <li><strong>LLM API-based</strong> — best when conversations are open-ended, or when you need the bot to handle questions you cannot fully anticipate in advance</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the easiest way to build a chatbot in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The easiest way is to start with a rule-based chatbot using simple keyword matching or the Python NLTK library, then progress to an API-based chatbot that calls an LLM API for open-ended responses once you understand the basic request-response loop.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Do I need machine learning knowledge to build a basic chatbot?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. A rule-based or intent-matching chatbot can be built with basic Python and string matching, no machine learning required. ML or an LLM API becomes useful only when you want the chatbot to handle open-ended, unscripted conversation.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Which Python libraries are commonly used for chatbots?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Common choices are NLTK for basic text processing and pattern matching, scikit-learn for a lightweight intent classifier, and the requests library or an official SDK to call an LLM API such as OpenAI or Anthropic for more natural, open-ended responses.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Explore More Free AI Dev Tools</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Dev Brains AI offers free tools for regex, SQL, cron, JSON, and Base64 generation —
              plus an AI Error Explainer to decode confusing stack traces in seconds.
            </p>
            <Link href="/ai-error-explainer">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Try AI Error Explainer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/nlp-projects-for-final-year-students">NLP Projects for Final Year Students</Link></li>
              <li><Link href="/blog/python-ai-projects-for-engineering-students-india">Python AI Projects for Engineering Students India</Link></li>
              <li><Link href="/blog/ai-microservices-tutorial-for-backend-developers">AI Microservices Tutorial for Backend Developers</Link></li>
              <li><Link href="/blog/how-ai-code-generators-work-explained">How AI Code Generators Work, Explained</Link></li>
              <li><Link href="/blog/ai-projects-for-engineering-students-india">AI Projects for Engineering Students India</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
