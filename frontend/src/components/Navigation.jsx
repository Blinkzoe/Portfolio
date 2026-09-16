export default function Navigation({ activeTab, onNavigate }) {

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white border-b border-slate-100">

      <div className="max-w-6xl mx-auto px-4">

        <div className="flex overflow-x-auto py-2 gap-1 scrollbar-hide">

          {tabs.map((tab) => (

            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id, tab.label)}
              className={`
                whitespace-nowrap
                px-4 py-2.5
                rounded-xl
                text-xs
                font-medium
                transition-all
                ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }
              `}
            >
              {tab.label}
            </button>

          ))}

        </div>

      </div>

    </nav>
  );
}
