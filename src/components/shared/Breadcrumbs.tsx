import { Link } from "@/i18n/routing";

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="py-16 flex items-center gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Link href={item.url} className={`font-medium ${index === items.length - 1 ? "text-primary" : "text-[#677E8B]"}`}>
            {item.label}
          </Link>
          {index !== items.length - 1 && <span className="bg-[#677E8B] w-1 h-1 rounded-full"></span>}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
