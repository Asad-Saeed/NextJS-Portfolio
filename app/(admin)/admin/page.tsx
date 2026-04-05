import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  FiBookOpen,
  FiBriefcase,
  FiAward,
  FiFolder,
  FiStar,
  FiThumbsUp,
  FiMessageCircle,
  FiInbox,
} from "react-icons/fi";

async function getCounts() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return {
      education: 0,
      experience: 0,
      expertise: 0,
      portfolio: 0,
      skills: 0,
      recommendations: 0,
      reviews: 0,
      unreadMessages: 0,
      totalMessages: 0,
    };

  const uid = user.id;
  const [
    education,
    experience,
    expertise,
    portfolio,
    skills,
    recommendations,
    reviews,
    unreadMessages,
    totalMessages,
  ] = await Promise.all([
    supabase.from("education").select("id", { count: "exact", head: true }).eq("user_id", uid),
    supabase.from("experience").select("id", { count: "exact", head: true }).eq("user_id", uid),
    supabase.from("expertise").select("id", { count: "exact", head: true }).eq("user_id", uid),
    supabase
      .from("portfolio_projects")
      .select("id", { count: "exact", head: true })
      .eq("user_id", uid),
    supabase.from("skills").select("id", { count: "exact", head: true }).eq("user_id", uid),
    supabase
      .from("recommendations")
      .select("id", { count: "exact", head: true })
      .eq("user_id", uid),
    supabase.from("client_reviews").select("id", { count: "exact", head: true }).eq("user_id", uid),
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("user_id", uid)
      .eq("is_read", false),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", uid),
  ]);

  return {
    education: education.count ?? 0,
    experience: experience.count ?? 0,
    expertise: expertise.count ?? 0,
    portfolio: portfolio.count ?? 0,
    skills: skills.count ?? 0,
    recommendations: recommendations.count ?? 0,
    reviews: reviews.count ?? 0,
    unreadMessages: unreadMessages.count ?? 0,
    totalMessages: totalMessages.count ?? 0,
  };
}

const cards = [
  { key: "education", label: "Education", href: "/admin/education", icon: FiBookOpen },
  { key: "experience", label: "Experience", href: "/admin/experience", icon: FiBriefcase },
  { key: "expertise", label: "Expertise", href: "/admin/expertise", icon: FiAward },
  { key: "portfolio", label: "Projects", href: "/admin/portfolio", icon: FiFolder },
  { key: "skills", label: "Skills", href: "/admin/skills", icon: FiStar },
  {
    key: "recommendations",
    label: "Recommendations",
    href: "/admin/recommendations",
    icon: FiThumbsUp,
  },
  { key: "reviews", label: "Reviews", href: "/admin/reviews", icon: FiMessageCircle },
  { key: "unreadMessages", label: "New Messages", href: "/admin/messages", icon: FiInbox },
];

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="text-Snow text-xl sm:text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-LightGray text-sm mb-8">Manage your portfolio content</p>

      {/* Unread Messages KPI */}
      {counts.unreadMessages > 0 && (
        <Link
          href="/admin/messages"
          className="card_stylings p-5 mb-6 flex items-center justify-between border-l-4 border-l-Green block"
        >
          <div className="flex items-center gap-3">
            <FiInbox className="text-Green text-2xl" />
            <div>
              <span className="text-Snow font-bold text-lg">
                {counts.unreadMessages} unread message{counts.unreadMessages > 1 ? "s" : ""}
              </span>
              <p className="text-LightGray text-xs">{counts.totalMessages} total messages</p>
            </div>
          </div>
          <span className="bg-Green text-Black text-xs font-bold px-3 py-1 rounded-full">View</span>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="card_stylings p-4 sm:p-6 flex flex-col gap-3 group overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <card.icon className="text-Green text-xl" />
              <span className="text-Snow text-2xl font-bold">
                {counts[card.key as keyof typeof counts]}
              </span>
            </div>
            <span className="text-LightGray text-xs sm:text-sm group-hover:text-Snow transition-colors truncate block">
              {card.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 card_stylings p-6">
        <h2 className="text-Snow text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/profile" className="button">
            Edit Profile
          </Link>
          <Link href="/admin/portfolio" className="button">
            Add Project
          </Link>
          <Link href="/admin/sidebar" className="button">
            Edit Sidebar
          </Link>
          <Link href="/admin/messages" className="button">
            View Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
