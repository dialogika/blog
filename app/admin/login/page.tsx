import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FormLogin from "@/components/login/FormLogin";

const page = async () => {
  return (
    <>
      <Breadcrumbs
        title="Create New Article"
        breadcrumbs={[
          { title: "Home", link: "https://www.dialogika.co" },
          { title: "Blog", link: "../../../blog" },
          { title: "Admin", link: "../../admin" },
          { title: "Login", link: "../login" },
        ]}
      />
      <section className="section container">
        <FormLogin />
      </section>
    </>
  );
};

export default page;
