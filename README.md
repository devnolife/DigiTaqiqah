# DigiTaqiqah - Digital Aqiqah Invitation

DigiTaqiqah is a beautiful, interactive digital invitation web application designed specifically for Aqiqah ceremonies. With elegant animations, Islamic themes, and a mobile-first approach, DigiTaqiqah creates memorable virtual invitations for your special occasion.


## Features

- 🎨 **Beautiful UI/UX** - Modern design with elegant animations and Islamic patterns
- 📱 **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- 🎵 **Background Music** - Toggle-able background music for immersive experience
- 🗓️ **Countdown Timer** - Interactive countdown to the event date
- 🖼️ **Photo Gallery** - Showcase your baby's photos with an interactive gallery
- 📍 **Location Information** - Clear display of event details and location
- 🎉 **Interactive Elements** - Confetti animations and interactive components
- 🔗 **Social Sharing** - Easy sharing options for your invitation

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety for better development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Powerful animation library
- **Radix UI** - Unstyled, accessible UI components
- **Shadcn UI** - Beautifully designed components

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devnolife/digitaqiqah.git
   cd digitaqiqah
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

Customize your invitation by modifying the following files:

1. **Event Information**: Update the event details in `components/invitation-card.tsx`
2. **Images**: Replace the images in the `public/images` directory
3. **Audio**: Replace the background music in `public/audio` directory
4. **Colors and Theme**: Modify the colors in the Tailwind config and component files

## Deployment

The easiest way to deploy your DigiTaqiqah application is using Vercel:

```bash
pnpm install -g vercel
vercel
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Created with ❤️ by devnolife
- Islamic patterns and designs inspired by traditional Islamic art
- Special thanks to the Shadcn UI and Next.js communities 