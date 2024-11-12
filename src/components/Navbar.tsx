import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "../../auth";
import { LogIn } from "lucide-react";
import { LogOut } from "lucide-react";
import { BadgePlus } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between ">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <BadgePlus className="sm:hidden size-6" />
                <span className="hidden sm:flex">Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <LogOut className="sm:hidden size-6 text-primary" />
                  <span className="hidden sm:flex">Logout</span>
                </button>
              </form>

              <Link
                href={`/user/${session?.user?.id}`}
                className="flex items-center gap-5"
              >
                <p className="hidden sm:flex">{session?.user?.name}</p>
                <Image
                  src={session?.user.image || ""}
                  alt={session?.user.name || ""}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">
                <LogIn className="sm:hidden text-primary" />
                <span className="hidden sm:flex">Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
