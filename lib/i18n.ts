export type Locale = 'en' | 'es'

export const locales: Locale[] = ['en', 'es']
export const defaultLocale: Locale = 'en'

export const translations = {
  en: {
    // Navbar
    nav: {
      features: 'Features',
      useCases: 'Use Cases',
      joinBeta: 'Join Beta',
    },
    // Hero
    hero: {
      badge: 'Featured on Hacker News',
      title1: 'The Operating System',
      title2: 'for Code',
      subtitle: 'Build compilers, kernels, and optimized software through visual nodes.\nFrom Assembly to execution, in real-time.',
      badge1: 'Assembly x86-64',
      badge2: 'Multi-language',
      badge3: 'Real compilation',
      counter: 'developers on waitlist',
      emailPlaceholder: 'Enter your email',
      cta: 'Join Private Beta',
      joining: 'Joining...',
      joined: 'Joined!',
      success: '✓ Check your inbox for confirmation!',
      earlyAccess: 'Early beta users get lifetime PRO discount (50% off)',
    },
    // Problem Solution
    problemSolution: {
      problemTitle: 'System Development is Broken',
      problems: [
        {
          title: 'Assembly is Text',
          description: 'You write 5,000 lines in Vim. If something fails, you manually search through scattered files.',
        },
        {
          title: 'Composition is Manual',
          description: 'Macros, includes, headers. Every change = recompile everything. Infinite Git conflicts.',
        },
        {
          title: 'Teams Work in Silos',
          description: 'Developer A waits for B to finish. Merge hell. 2 hours of overhead for 10 lines.',
        },
      ],
      solutionTitle: 'Omega-Visual Changes Everything',
      solutions: [
        {
          title: 'Visual Nodes',
          description: 'Each file is a node. Double-click to edit. Connections show dependencies.',
        },
        {
          title: 'Houdini-Style Composition',
          description: '{{node_name}} inherits upstream code. Dual-view: Raw vs Composed. Automatic.',
        },
        {
          title: 'Real-Time Collaboration',
          description: 'See your team\'s cursors. Connect nodes live. Run All = compiles on each PC.',
        },
      ],
    },
    // Interactive Demo
    demo: {
      title: 'See It In Action',
      canvasTitle: 'Node Canvas',
      runDemo: 'Run Demo',
      running: 'Running...',
      selectNode: 'Select a node',
      clickNodes: 'Click nodes on the canvas to view their code',
      terminalOutput: 'Terminal Output',
      clickToRun: 'Click "Run Demo" to see compilation...',
    },
    // Use Cases
    useCases: {
      title: 'Built for the Hardest Problems in Computing',
    },
    // Features
    features: {
      title: 'Enterprise-Grade Features',
    },
    // Comparison
    comparison: {
      title: 'Why Omega-Visual Wins',
      seeFull: 'See the full comparison →',
    },
    // Testimonials
    testimonials: {
      title: 'What Developers Are Saying',
    },
    // Architecture
    architecture: {
      title: 'Powered by Modern Tech',
    },
    // Roadmap
    roadmap: {
      title: 'The Future of Omega-Visual',
    },
    // Final CTA
    finalCTA: {
      title: 'Join the Revolution in System Development',
      subtitle: '10,000+ developers are already on the waitlist. Don\'t miss the future of code.',
      cta: 'Request Private Beta Access',
      requesting: 'Requesting...',
      requested: 'Requested!',
      success: '✓ Check your inbox for confirmation!',
      earlyAccess: 'Early beta users get lifetime PRO discount (50% off)',
      trusted: 'Trusted by teams at',
    },
    // Footer
    footer: {
      product: 'Product',
      community: 'Community',
      legal: 'Legal',
      contact: 'Contact',
      copyright: '© 2024-2025 Eddi Andreé Salazar Matos. All rights reserved.',
      copyright2: 'Omega-Visual and its visual node system are protected under',
      copyright3: 'the Berne Convention for the Protection of Literary and',
      copyright4: 'Artistic Works.',
      copyright5: 'Patent pending: Visual node composition for low-level programming.',
      copyright6: 'First public disclosure: November 16, 2025',
    },
  },
  es: {
    // Navbar
    nav: {
      features: 'Características',
      useCases: 'Casos de Uso',
      joinBeta: 'Únete a Beta',
    },
    // Hero
    hero: {
      badge: 'Destacado en Hacker News',
      title1: 'El Sistema Operativo',
      title2: 'para Código',
      subtitle: 'Construye compiladores, kernels y software optimizado mediante nodos visuales.\nDesde Assembly hasta ejecución, en tiempo real.',
      badge1: 'Assembly x86-64',
      badge2: 'Multi-idioma',
      badge3: 'Compilación real',
      counter: 'desarrolladores en lista de espera',
      emailPlaceholder: 'Ingresa tu email',
      cta: 'Únete a Beta Privada',
      joining: 'Uniéndose...',
      joined: '¡Unido!',
      success: '✓ ¡Revisa tu bandeja de entrada para confirmar!',
      earlyAccess: 'Los usuarios beta tempranos obtienen descuento PRO de por vida (50% off)',
    },
    // Problem Solution
    problemSolution: {
      problemTitle: 'El Desarrollo de Sistemas Está Roto',
      problems: [
        {
          title: 'Assembly es Texto',
          description: 'Escribes 5,000 líneas en Vim. Si algo falla, buscas manualmente en archivos dispersos.',
        },
        {
          title: 'La Composición es Manual',
          description: 'Macros, includes, headers. Cada cambio = recompilar todo. Conflictos infinitos de Git.',
        },
        {
          title: 'Los Equipos Trabajan en Silos',
          description: 'El desarrollador A espera que B termine. Merge hell. 2 horas de overhead por 10 líneas.',
        },
      ],
      solutionTitle: 'Omega-Visual Lo Cambia Todo',
      solutions: [
        {
          title: 'Nodos Visuales',
          description: 'Cada archivo es un nodo. Doble-click para editar. Las conexiones muestran dependencias.',
        },
        {
          title: 'Composición Estilo Houdini',
          description: '{{node_name}} hereda código upstream. Vista dual: Raw vs Composed. Automático.',
        },
        {
          title: 'Colaboración en Tiempo Real',
          description: 'Ve los cursores de tu equipo. Conecta nodos en vivo. Run All = compila en cada PC.',
        },
      ],
    },
    // Interactive Demo
    demo: {
      title: 'Véalo en Acción',
      canvasTitle: 'Canvas de Nodos',
      runDemo: 'Ejecutar Demo',
      running: 'Ejecutando...',
      selectNode: 'Selecciona un nodo',
      clickNodes: 'Haz clic en los nodos del canvas para ver su código',
      terminalOutput: 'Salida de Terminal',
      clickToRun: 'Haz clic en "Ejecutar Demo" para ver la compilación...',
    },
    // Use Cases
    useCases: {
      title: 'Construido para los Problemas Más Difíciles en Computación',
    },
    // Features
    features: {
      title: 'Características de Nivel Empresarial',
    },
    // Comparison
    comparison: {
      title: 'Por Qué Omega-Visual Gana',
      seeFull: 'Ver la comparación completa →',
    },
    // Testimonials
    testimonials: {
      title: 'Lo Que Dicen los Desarrolladores',
    },
    // Architecture
    architecture: {
      title: 'Impulsado por Tecnología Moderna',
    },
    // Roadmap
    roadmap: {
      title: 'El Futuro de Omega-Visual',
    },
    // Final CTA
    finalCTA: {
      title: 'Únete a la Revolución en el Desarrollo de Sistemas',
      subtitle: 'Más de 10,000 desarrolladores ya están en la lista de espera. No te pierdas el futuro del código.',
      cta: 'Solicitar Acceso a Beta Privada',
      requesting: 'Solicitando...',
      requested: '¡Solicitado!',
      success: '✓ ¡Revisa tu bandeja de entrada para confirmar!',
      earlyAccess: 'Los usuarios beta tempranos obtienen descuento PRO de por vida (50% off)',
      trusted: 'Confiado por equipos en',
    },
    // Footer
    footer: {
      product: 'Producto',
      community: 'Comunidad',
      legal: 'Legal',
      contact: 'Contacto',
      copyright: '© 2024-2025 Eddi Andreé Salazar Matos. Todos los derechos reservados.',
      copyright2: 'Omega-Visual y su sistema de nodos visuales están protegidos bajo',
      copyright3: 'la Convención de Berna para la Protección de Obras Literarias y',
      copyright4: 'Artísticas.',
      copyright5: 'Patente pendiente: Composición de nodos visuales para programación de bajo nivel.',
      copyright6: 'Primera divulgación pública: 16 de noviembre de 2025',
    },
  },
} as const

export type TranslationKey = keyof typeof translations.en

