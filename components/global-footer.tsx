import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function GlobalFooter() {
  return (
    <footer className="bg-gradient-to-r from-[#0F0F23] via-[#1A1A2E] to-[#0F0F23] pt-16 pb-0 mt-auto border-t border-gray-800/30">
      <div className="px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-6 xl:col-span-7">
            <div className="flex items-center bg-[#5B46E5]/20 rounded-2xl px-4 py-3 border border-[#5B46E5]/30 w-fit">
              <img src="/assets/logo.png" alt="ESPORTSIFY Logo" className="w-5 h-4 mr-3" />
              <span className="text-[#5B46E5] font-bold text-xl">E</span>
              <span className="text-white font-bold text-xl">SPORT</span>
              <span className="text-[#5B46E5] font-bold text-xl">SIFY</span>
            </div>

            <p className="text-[#A5B4FC] text-lg max-w-xl md:max-w-3xl">
              The ultimate platform for managing esports tournaments, teams, and players across multiple gaming
              titles.
            </p>

            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-[#7C3AED] to-[#3D5AF1] hover:from-[#6D28D9] hover:to-[#2563EB] w-12 h-12 rounded-xl">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button className="bg-gradient-to-r from-[#EF4444] to-[#F59E0B] hover:from-[#DC2626] hover:to-[#D97706] w-12 h-12 rounded-xl">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button className="bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] w-12 h-12 rounded-xl">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>

            {/* Richer text content to reduce empty space */}
            <div className="pt-4 space-y-3 text-[#A5B4FC] max-w-3xl leading-relaxed">
              <p>
                Esportsify is your hub for discovering and following tournaments across the world’s most popular titles.
                Stay up to date with schedules, live results, and curated highlights, all in one place.
              </p>
              <p>
                For organizers, our streamlined tools simplify registration, seeding, and bracket management while keeping
                players informed with real‑time updates. Share news, capture key moments, and grow your community with
                built‑in discovery.
              </p>
            </div>
          </div>

          {/* Gaming Universe */}
          <div className="bg-gradient-to-br from-[#3D5AF1]/10 to-[#5B46E5]/15 rounded-3xl border border-[#5B46E5]/30 p-8 lg:col-span-6 xl:col-span-5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Gaming Universe</h3>
              <div className="bg-gradient-to-r from-[#3D5AF1] to-[#5B46E5] px-6 py-2 rounded-full">
                <span className="text-white text-sm font-bold">6 Games</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { code: "LoL", name: "League of Legends" },
                { code: "CS2", name: "Counter-Strike 2" },
                { code: "VAL", name: "Valorant" },
                { code: "D2", name: "Dota 2" },
                { code: "OW2", name: "Overwatch 2" },
                { code: "SC2", name: "StarCraft II" },
              ].map((game, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-white font-bold text-xl mb-2 group-hover:text-[#5B46E5] transition-colors">
                    {game.code}
                  </div>
                  <div className="text-[#A5B4FC] text-sm font-medium">{game.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-gradient-to-r from-[#1A1A2E]/90 to-[#0F0F23]/90 rounded-t-3xl mt-12 px-8 py-6">
          <div className="text-center">
            <p className="text-[#A5B4FC] text-lg">© 2025 eSport Manager. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
