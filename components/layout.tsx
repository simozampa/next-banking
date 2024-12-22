import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <>
      <nav className="py-4 shadow-sm">
        <div className="text-sm mx-auto flex justify-center items-center">
          <div className="space-x-10">
            <Link
              href="/customers"
              className={classNames(
                "text-gray-800 hover:text-gray-900",
                pathName === "/customers"
                  ? "text-indigo-500"
                  : "text-gray-800 hover:text-gray-900"
              )}
            >
              Customers
            </Link>
            <Link
              href="/accounts"
              className="text-gray-800 hover:text-gray-900"
            >
              Accounts
            </Link>
            <Link
              href="/transfers"
              className="text-gray-800 hover:text-gray-900"
            >
              Transfers
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-8 p-4 text-gray-700">{children}</div>
    </>
  );
}
