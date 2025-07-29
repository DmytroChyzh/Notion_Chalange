# Notion AI Interface

A fully functional AI-powered workspace inspired by Notion, built with Next.js 15, TypeScript, and OpenAI GPT-4 integration.

## 🚀 Features

- **🤖 Real AI Integration** - Powered by OpenAI GPT-4 for intelligent content generation
- **📝 AI Page Creation** - Generate new content with AI assistance
- **📊 Smart Table Generation** - Create organized data tables with AI
- **🔄 Workflow Planning** - Design detailed project workflows with AI guidance
- **💬 AI Chat Assistant** - Interactive chat with intelligent responses
- **📈 Data Visualization** - Transform data into beautiful charts
- **🎨 Notion-Inspired Design** - Clean, modern interface with smooth animations
- **🌙 Dark/Light Theme** - Seamless theme switching
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Real-time AI Processing** - Live loading states and progress indicators

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI Integration**: OpenAI GPT-4 API
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Themes**: next-themes
- **Animations**: Framer Motion (built-in)

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/DmytroChyzh/Notion_Chalange.git
cd Notion_Chalange
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Customize AI behavior
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7
```

4. **Get your OpenAI API key:**
- Visit [OpenAI Platform](https://platform.openai.com/)
- Create an account or sign in
- Go to API Keys section
- Create a new API key
- Copy the key to your `.env.local` file

5. **Run the development server:**
```bash
pnpm dev
```

6. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### Getting Started
1. **Welcome Screen** - Complete the onboarding to understand AI capabilities
2. **AI Dashboard** - Choose from four main AI-powered actions:
   - **Create Page** - Generate new content
   - **Plan Workflow** - Create project workflows
   - **Generate Table** - Build data tables
   - **AI Query** - Ask questions to AI

### AI Features
- **Real-time Processing** - Watch AI think and generate content
- **Contextual Responses** - AI understands your requests and provides relevant content
- **Multiple Formats** - Get responses in text, table, workflow, or visualization formats
- **Error Handling** - Graceful error handling with retry options

## 🏗 Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
notion-ai-interface/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (OpenAI integration)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix UI)
│   ├── ai-dashboard.tsx  # Main AI dashboard
│   ├── welcome-screen.tsx # Onboarding screen
│   ├── loading-spinner.tsx # AI loading animations
│   └── ...               # Other components
├── hooks/                # Custom React hooks
│   ├── use-ai.ts         # AI integration hook
│   └── use-toast.ts      # Toast notifications
├── lib/                  # Utilities and configurations
│   ├── openai.ts         # OpenAI service layer
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🔧 Configuration

### OpenAI Settings
You can customize AI behavior by modifying these environment variables:

- `OPENAI_MODEL` - AI model to use (default: gpt-4)
- `OPENAI_MAX_TOKENS` - Maximum response length (default: 2000)
- `OPENAI_TEMPERATURE` - Response creativity (0.0-1.0, default: 0.7)

### Customization
- **Themes**: Modify `tailwind.config.ts` for custom colors
- **Components**: All UI components are in `components/ui/`
- **AI Prompts**: Customize system prompts in `lib/openai.ts`

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DmytroChyzh/Notion_Chalange)

### Other Platforms
The app is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security

- API keys are stored securely in environment variables
- Server-side API routes prevent client-side exposure
- Input validation and sanitization
- Rate limiting and error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Dmytro Chyzh**
- GitHub: [@DmytroChyzh](https://github.com/DmytroChyzh)

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- Vercel for the amazing Next.js framework
- Radix UI for the excellent component library
- The open-source community for inspiration and tools

---

**Ready to experience the future of AI-powered productivity?** 🚀 