import { useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";

import { BannerSection } from "@/pages/Mint/components/BannerSection";
import { HeroSection } from "@/pages/Mint/components/HeroSection";
import { StatsSection } from "@/pages/Mint/components/StatsSection";
import { OurStorySection } from "@/pages/Mint/components/OurStorySection";
import { HowToMintSection } from "@/pages/Mint/components/HowToMintSection";
import { OurTeamSection } from "@/pages/Mint/components/OurTeamSection";
import { FAQSection } from "@/pages/Mint/components/FAQSection";
import { Socials } from "@/pages/Mint/components/Socials";
import { ConnectWalletAlert } from "@/pages/Mint/components/ConnectWalletAlert";

import { useGetCollectionData } from "@/hooks/useGetCollectionData";

import { Header } from "@/components/Header";
import { aptosClient } from "@/utils/aptosClient";
import { getActiveOrNextMintStage } from "@/view-functions/getActiveOrNextMintStage";
import { getMintStageStartAndEndTime } from "@/view-functions/getMintStageStartAndEndTime";
import { getUserMintBalance } from "@/view-functions/getUserMintBalance";
import { getMintEnabled } from "@/view-functions/getMintEnabled";


export interface Token {
  token_name: string;
  cdn_asset_uris: {
    cdn_image_uri: string;
    asset_uri: string;
  };
}

export interface Collection {
  creator_address: string;
  collection_id: string;
  collection_name: string;
  current_supply: number;
  max_supply: number;
  uri: string;
  description: string;
  cdn_asset_uris: {
    cdn_animation_uri: string;
    cdn_image_uri: string;
  };
}

interface MintQueryResult {
  start_date: string;
  end_date: string;
  current_collections_v2: Array<Collection>;
  current_collection_ownership_v2_view: {
    owner_address: string;
  };
  current_collection_ownership_v2_view_aggregate: {
    aggregate: {
      count: number;
    };
  };
  current_token_datas_v2: Array<Token>;
}

// interface MintData {
//   maxSupply: number;
//   totalMinted: number;
//   uniqueHolders: number;
//   userMintBalance: number;
//   collection: Collection;
//   startDate: Date;
//   endDate: Date;
//   isMintActive: boolean;
//   isMintInfinite: boolean;
// }


async function getCollectionData(collection_address:string,account: any): Promise<any | null> {
  // const { account } = useWallet();

  try {
    if (!collection_address) return null;

    const res = await aptosClient().queryIndexer<MintQueryResult>({
      query: {
        variables: {
          collection_id: collection_address,
        },
        query: `
          query TokenQuery($collection_id: String) {
            current_collections_v2(
              where: { collection_id: { _eq: $collection_id } }
              limit: 1
            ) {
              creator_address
              collection_id
              collection_name
              current_supply
              max_supply
              uri
              description
              cdn_asset_uris {
                cdn_animation_uri
                cdn_image_uri
              }
            }
            current_collection_ownership_v2_view_aggregate(
              where: { collection_id: { _eq: $collection_id } }
            ) {
              aggregate {
                count(distinct: true, columns: owner_address)
              }
            }
          }`,
      },
    });

    const collection = res.current_collections_v2[0];
    if (!collection) return null;

    const mintStageRes = await getActiveOrNextMintStage({ collection_address });
    if (mintStageRes.length === 0) {
      return {
        maxSupply: collection.max_supply ?? 0,
        totalMinted: collection.current_supply ?? 0,
        uniqueHolders: res.current_collection_ownership_v2_view_aggregate.aggregate?.count ?? 0,
        userMintBalance: 0,
        collection,
        endDate: new Date(),
        startDate: new Date(),
        isMintActive: false,
        isMintInfinite: false,
      };
    }

    const mint_stage = mintStageRes[0];
    const { startDate, endDate, isMintInfinite } = await getMintStageStartAndEndTime({
      collection_address,
      mint_stage,
    });

    const userMintBalance = account == null
      ? 0
      : await getUserMintBalance({ user_address: account.address, collection_address, mint_stage });

    const isMintEnabled = await getMintEnabled({ collection_address });

    return {
      maxSupply: collection.max_supply ?? 0,
      totalMinted: collection.current_supply ?? 0,
      uniqueHolders: res.current_collection_ownership_v2_view_aggregate.aggregate?.count ?? 0,
      userMintBalance,
      collection,
      endDate,
      startDate,
      isMintActive: isMintEnabled &&
                   new Date() >= startDate &&
                   new Date() <= endDate &&
                   collection.max_supply > collection.current_supply,
      isMintInfinite,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
export function Mint() {
  const { data, isLoading } = useGetCollectionData();
  const [tdata, settdata] = useState<any[]>([]);
  // const { account } = useWallet();
  const queryClient = useQueryClient();
  const { account } = useWallet();

  // Invalidate queries when account changes
  useEffect(() => {
    queryClient.invalidateQueries();
  }, [account, queryClient]);

  const collectionAddresses = [
    "0xe33219bc3f195ac1d475e3904704fdea9315723a8f211fd1643960ee772dc491",
    "0x98626a5c625668470babe7a5b0237939743bfc9d7a724f1178f102d93542c2e4",
    "0x76e5d2916439b9bdde6c03c71f25b255efca9485aa8519fff44a276f795b935e",
    "0x537ef7d6e6c076899c9de212ed18d2c25f8477a34c09d5b26b37714f5a2d5b2f"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData: any[] = [];

      // Use Promise.all to fetch data concurrently
      await Promise.all(collectionAddresses.map(async (addr) => {
        const dataa = await getCollectionData(addr,account);
        if (dataa) fetchedData.push(dataa); // Only add if data is not null
      }));

      settdata(fetchedData); // Set the state with fetched data
      console.log(fetchedData); // Log fetched data
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <h1 className="title-md">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="overflow-hidden">
        <main className="flex flex-col gap-10 md:gap-16 mt-6">
          <ConnectWalletAlert />
          {tdata?.map((data, index) => (
            <div key={index}>
              <HeroSection data={data} />
              <StatsSection data={data}/>
            </div>
          ))}
          
          <OurStorySection />
          <HowToMintSection />
          <BannerSection />
          <OurTeamSection />
          <FAQSection />
        </main>

        <footer className="footer-container px-4 pb-6 w-full max-w-screen-xl mx-auto mt-6 md:mt-16 flex items-center justify-between">
          <p>{data?.collection.collection_name}</p>
          <Socials />
        </footer>
      </div>
    </>
  );
}
