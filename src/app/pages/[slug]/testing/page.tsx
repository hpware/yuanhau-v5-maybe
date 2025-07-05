import ClientPage from "../Client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `Pages`,
    description: "吳元皓的個人網站",
    openGraph: {
      title: "吳元皓",
      description: "吳元皓的個人網站",
      url: "https://yuanhau.com",
      siteName: "吳元皓",
      locale: "zh_TW",
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <ClientPage
      db={{
        uuid: "string",
        slug: "string",
        title: "Hello",
        writer: "Howard",
        page_type: "landing",
        status: "archived",
        markdown_content: `#string
        Hello sdjpgrw9e0ufvswe0-8fur99few90fuwe9fu90u0fue9sdfuwesdcu9suew0fw9feu9fuds90ucf9s0euf9w0uf9euf90fue9w0uf0fuwefu9we0fuew0f9ewuf90eufw

        ewf-uds9fu0ew9uf9sdu9u0ewuasdpcodscviewfeosdhfoewfh80923ewhfowiefhcoishv8few8fhs89vhr89rhf89h2few89sfhew89gh89whf8sdchd98fhew98gev89s

        wehece8dshc8sd9hevw9fh8qeha9ec8hed8evrwfyhw389dhsv89wrhro3qhdaeiduhveowhded8oa

        `,
        landing_image: "string",
        created_at: "string",
        updated_at: "string",
      }}
    />
  );
}
