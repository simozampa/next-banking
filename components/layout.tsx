import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <>
      <nav className="py-6 shadow-sm">
        <div className="text-sm mx-auto flex justify-center items-center">
          <div className="space-x-10">
            <Link
              href="/"
              className={classNames(
                "font-medium",
                pathName === "/"
                  ? "text-indigo-500"
                  : "text-gray-800 hover:text-gray-900"
              )}
            >
              Customers
            </Link>
            <Link
              href="/accounts"
              className={classNames(
                "font-medium",
                pathName === "/accounts"
                  ? "text-indigo-500"
                  : "text-gray-800 hover:text-gray-900"
              )}
            >
              Accounts
            </Link>
            <Link
              href="/transfers"
              className={classNames(
                "font-medium",
                pathName === "/transfers"
                  ? "text-indigo-500"
                  : "text-gray-800 hover:text-gray-900"
              )}
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
