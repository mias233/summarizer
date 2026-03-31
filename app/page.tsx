import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">Loved by <span className="gradient-text">thousands.</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join students, researchers, and busy professionals who are already saving hours every week.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                role: "Graduate Student",
                content: "SummZ.AI has completely changed how I research for my thesis. I can't imagine going back to watching full lectures.",
                avatar: "https://i.pravatar.cc/150?u=alex",
              },
              {
                name: "Sarah Chen",
                role: "Product Manager",
                content: "I use it for catching up on industry webinars and tech talks. The time-stamped summaries are a game-changer.",
                avatar: "https://i.pravatar.cc/150?u=sarah",
              },
              {
                name: "Michael Ross",
                role: "Software Engineer",
                content: "Simple, powerful, and fast. The multi-language support is actually impressive. Highly recommended!",
                avatar: "https://i.pravatar.cc/150?u=michael",
              }
            ].map((testimonial, i) => (
              <div key={i} className="glass-card p-6 border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border border-primary/20" />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">&quot;{testimonial.content}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container text-center">
          <div className="glass-card p-12 py-16 border-primary/20 max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-purple-500/10">
            <h2 className="text-3xl font-bold mb-6 md:text-5xl">Ready to save time?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Join SummZ.AI today and start transforming your YouTube experience.
            </p>
            <button className="h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-white shadow-xl shadow-primary/25 hover:opacity-90 transition-all">
              Try it for free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
