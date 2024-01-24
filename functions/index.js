import { ContractPromise } from '@polkadot/api-contract';
import { toastError, toastSuccess } from "@/components/toast";
import { useWallet, useAllWallets } from 'useink';

export const formatWallet = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;
}

const ABIs = {
    factory:{"source":{"hash":"0x43eb66a97f1ae8cc03b5e504f75accbaa46fca33763f1a0c0c3170ebf4540604","language":"ink! 4.3.0","compiler":"rustc 1.75.0-nightly","build_info":{"build_mode":"Release","cargo_contract_version":"3.2.0","rust_toolchain":"nightly-x86_64-unknown-linux-gnu","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"factory","version":"0.2.1","authors":["Edinyanga Ottoho","Build3rs"],"description":"Factory contract that mints foxes or chickens","repository":"https://github.com/Build3rs-Labs/foxies","homepage":"https://github.com/Build3rs-Labs/foxies","license":"Apache-2.0"},"spec":{"constructors":[{"args":[{"label":"fees_account","type":{"displayName":["AccountId"],"type":2}}],"default":false,"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":5},"selector":"0x9bae9d5e"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":2},"balance":{"displayName":["Balance"],"type":1},"blockNumber":{"displayName":["BlockNumber"],"type":22},"chainExtension":{"displayName":["ChainExtension"],"type":23},"hash":{"displayName":["Hash"],"type":20},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":21}},"events":[],"lang_error":{"displayName":["ink","LangError"],"type":7},"messages":[{"args":[],"default":false,"docs":[],"label":"get_account_id","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":8},"selector":"0x79718546"},{"args":[{"label":"address","type":{"displayName":["AccountId"],"type":2}}],"default":false,"docs":[],"label":"set_chickens_nft_address","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x6bc4bc7e"},{"args":[{"label":"address","type":{"displayName":["AccountId"],"type":2}}],"default":false,"docs":[],"label":"set_foxes_nft_address","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x210e80e5"},{"args":[{"label":"amount","type":{"displayName":["u128"],"type":1}}],"default":false,"docs":[],"label":"set_azero_for_direct_fox_mints","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x864d61c0"},{"args":[{"label":"amount","type":{"displayName":["u128"],"type":1}}],"default":false,"docs":[],"label":"set_azero_for_random_mints","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0xb3247578"},{"args":[],"default":false,"docs":[],"label":"mint_nft","mutates":true,"payable":true,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x219a113e"},{"args":[],"default":false,"docs":[],"label":"pick_random_fox_holder_with_rarity","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":13},"selector":"0x230aeaa1"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":2}}],"default":false,"docs":[],"label":"get_last_mint_by_account","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":15},"selector":"0x1a7d8b69"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":2}}],"default":false,"docs":[],"label":"get_direct_fox_mints","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":18},"selector":"0x81ce1659"},{"args":[{"label":"index","type":{"displayName":["u128"],"type":1}}],"default":false,"docs":[],"label":"get_fox_rarity","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":19},"selector":"0x9f060b73"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"root":{"layout":{"leaf":{"key":"0x533e17ba","ty":0}},"root_key":"0x533e17ba"}},"name":"rarities"},{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"nfts"},{"layout":{"root":{"layout":{"leaf":{"key":"0x2fc38212","ty":1}},"root_key":"0x2fc38212"}},"name":"nfts_rarity"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":2}},"name":"0"}],"name":"Some"}}}},"name":"chickens_nft_address"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":2}},"name":"0"}],"name":"Some"}}}},"name":"foxes_nft_address"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":2}},"name":"0"}],"name":"Some"}}}},"name":"owner"},{"layout":{"root":{"layout":{"enum":{"dispatchKey":"0x334323a4","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0x334323a4","ty":4}},"name":"0"},{"layout":{"leaf":{"key":"0x334323a4","ty":1}},"name":"1"}],"name":"(A, B)"}},"name":"0"}],"name":"Some"}}}},"root_key":"0x334323a4"}},"name":"last_mint"},{"layout":{"leaf":{"key":"0x00000000","ty":1}},"name":"chickens_minted"},{"layout":{"root":{"layout":{"leaf":{"key":"0x3f710c0b","ty":4}},"root_key":"0x3f710c0b"}},"name":"direct_fox_mints"},{"layout":{"leaf":{"key":"0x00000000","ty":1}},"name":"azero_for_direct_fox_mints"},{"layout":{"leaf":{"key":"0x00000000","ty":1}},"name":"azero_for_random_mints"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":2}},"name":"0"}],"name":"Some"}}}},"name":"fees_account"}],"name":"Factory"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"sequence":{"type":1}}}},{"id":1,"type":{"def":{"primitive":"u128"}}},{"id":2,"type":{"def":{"composite":{"fields":[{"type":3,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":3,"type":{"def":{"array":{"len":32,"type":4}}}},{"id":4,"type":{"def":{"primitive":"u8"}}},{"id":5,"type":{"def":{"variant":{"variants":[{"fields":[{"type":6}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":6},{"name":"E","type":7}],"path":["Result"]}},{"id":6,"type":{"def":{"tuple":[]}}},{"id":7,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":8,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":7}],"path":["Result"]}},{"id":9,"type":{"def":{"variant":{"variants":[{"fields":[{"type":10}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":10},{"name":"E","type":7}],"path":["Result"]}},{"id":10,"type":{"def":{"variant":{"variants":[{"fields":[{"type":6}],"index":0,"name":"Ok"},{"fields":[{"type":11}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":6},{"name":"E","type":11}],"path":["Result"]}},{"id":11,"type":{"def":{"variant":{"variants":[{"fields":[{"type":12,"typeName":"String"}],"index":0,"name":"Custom"},{"index":1,"name":"FailedMint"},{"index":2,"name":"OnlyOwnerAllowed"},{"index":3,"name":"InvalidMintPayment"},{"index":4,"name":"ExceededDirectFoxMintAllowance"},{"index":5,"name":"FailedAZEROTransfer"}]}},"path":["factory","factory","FactoryError"]}},{"id":12,"type":{"def":{"primitive":"str"}}},{"id":13,"type":{"def":{"variant":{"variants":[{"fields":[{"type":14}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":14},{"name":"E","type":7}],"path":["Result"]}},{"id":14,"type":{"def":{"tuple":[2,1]}}},{"id":15,"type":{"def":{"variant":{"variants":[{"fields":[{"type":16}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":16},{"name":"E","type":7}],"path":["Result"]}},{"id":16,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":17}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":17}],"path":["Option"]}},{"id":17,"type":{"def":{"tuple":[4,1]}}},{"id":18,"type":{"def":{"variant":{"variants":[{"fields":[{"type":4}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":4},{"name":"E","type":7}],"path":["Result"]}},{"id":19,"type":{"def":{"variant":{"variants":[{"fields":[{"type":1}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":1},{"name":"E","type":7}],"path":["Result"]}},{"id":20,"type":{"def":{"composite":{"fields":[{"type":3,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":21,"type":{"def":{"primitive":"u64"}}},{"id":22,"type":{"def":{"primitive":"u32"}}},{"id":23,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"},
    staking:{"source":{"hash":"0xeda0060f64cb278344c0003a4cdc0350fa33db31f306b4cdd61012834d819af3","language":"ink! 4.3.0","compiler":"rustc 1.75.0-nightly","build_info":{"build_mode":"Release","cargo_contract_version":"3.2.0","rust_toolchain":"nightly-x86_64-unknown-linux-gnu","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"staking","version":"0.2.1","authors":["Edinyanga Ottoho","Build3rs"],"description":"Staking contract to stake chicken and earn $EGGS","repository":"https://github.com/Build3rs-Labs/foxies","homepage":"https://github.com/Build3rs-Labs/foxies","license":"Apache-2.0"},"spec":{"constructors":[{"args":[{"label":"factory","type":{"displayName":["AccountId"],"type":0}},{"label":"foxes","type":{"displayName":["AccountId"],"type":0}},{"label":"chickens","type":{"displayName":["AccountId"],"type":0}},{"label":"daily_eggs_per_chicken","type":{"displayName":["u128"],"type":3}},{"label":"cap_per_account","type":{"displayName":["u128"],"type":3}}],"default":false,"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":5},"selector":"0x9bae9d5e"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":0},"balance":{"displayName":["Balance"],"type":3},"blockNumber":{"displayName":["BlockNumber"],"type":17},"chainExtension":{"displayName":["ChainExtension"],"type":18},"hash":{"displayName":["Hash"],"type":16},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":4}},"events":[],"lang_error":{"displayName":["ink","LangError"],"type":7},"messages":[{"args":[],"default":false,"docs":[],"label":"get_account_id","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":8},"selector":"0x79718546"},{"args":[{"label":"address","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"set_eggs_address","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x20617414"},{"args":[{"label":"id","type":{"displayName":["u128"],"type":3}}],"default":false,"docs":[],"label":"stake_chicken","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x51642ef3"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"get_staked_chickens","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":13},"selector":"0xbe5cc8f7"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"get_staked_foxes","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":13},"selector":"0xa63f2aff"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"get_claimable_eggs","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":15},"selector":"0x1e8e3da7"},{"args":[],"default":false,"docs":[],"label":"unstake_chickens","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0xfb97b871"},{"args":[],"default":false,"docs":[],"label":"get_eggs_in_pool","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":15},"selector":"0x994c6564"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"get_claimable_for_fox","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":15},"selector":"0x73336d30"},{"args":[{"label":"id","type":{"displayName":["u128"],"type":3}}],"default":false,"docs":[],"label":"stake_fox","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0xc7738e66"},{"args":[],"default":false,"docs":[],"label":"unstake_foxes","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0xd786eb86"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"get_eggs_balance","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":15},"selector":"0x910eb6b0"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"0"}],"name":"Some"}}}},"name":"factory"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"0"}],"name":"Some"}}}},"name":"eggs"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"0"}],"name":"Some"}}}},"name":"foxes"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"0"}],"name":"Some"}}}},"name":"chickens"},{"layout":{"root":{"layout":{"leaf":{"key":"0x783f1d8b","ty":3}},"root_key":"0x783f1d8b"}},"name":"staked_chickens"},{"layout":{"root":{"layout":{"leaf":{"key":"0x27ad14a5","ty":3}},"root_key":"0x27ad14a5"}},"name":"number_of_chickens_staked"},{"layout":{"root":{"layout":{"leaf":{"key":"0x17c755b3","ty":4}},"root_key":"0x17c755b3"}},"name":"last_chickens_stake_time"},{"layout":{"root":{"layout":{"leaf":{"key":"0xc4e2fc5f","ty":3}},"root_key":"0xc4e2fc5f"}},"name":"staked_foxes"},{"layout":{"root":{"layout":{"leaf":{"key":"0x5cad1138","ty":3}},"root_key":"0x5cad1138"}},"name":"number_of_foxes_staked"},{"layout":{"root":{"layout":{"leaf":{"key":"0x80988a54","ty":4}},"root_key":"0x80988a54"}},"name":"last_foxes_stake_time"},{"layout":{"leaf":{"key":"0x00000000","ty":3}},"name":"daily_eggs_per_chicken"},{"layout":{"leaf":{"key":"0x00000000","ty":3}},"name":"cap_per_account"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"0"}],"name":"Some"}}}},"name":"owner"},{"layout":{"root":{"layout":{"leaf":{"key":"0xca629984","ty":0}},"root_key":"0xca629984"}},"name":"fox_staked_by"}],"name":"Staking"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"composite":{"fields":[{"type":1,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":1,"type":{"def":{"array":{"len":32,"type":2}}}},{"id":2,"type":{"def":{"primitive":"u8"}}},{"id":3,"type":{"def":{"primitive":"u128"}}},{"id":4,"type":{"def":{"primitive":"u64"}}},{"id":5,"type":{"def":{"variant":{"variants":[{"fields":[{"type":6}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":6},{"name":"E","type":7}],"path":["Result"]}},{"id":6,"type":{"def":{"tuple":[]}}},{"id":7,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":8,"type":{"def":{"variant":{"variants":[{"fields":[{"type":0}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":0},{"name":"E","type":7}],"path":["Result"]}},{"id":9,"type":{"def":{"variant":{"variants":[{"fields":[{"type":10}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":10},{"name":"E","type":7}],"path":["Result"]}},{"id":10,"type":{"def":{"variant":{"variants":[{"fields":[{"type":6}],"index":0,"name":"Ok"},{"fields":[{"type":11}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":6},{"name":"E","type":11}],"path":["Result"]}},{"id":11,"type":{"def":{"variant":{"variants":[{"fields":[{"type":12,"typeName":"String"}],"index":0,"name":"Custom"},{"index":1,"name":"ChickenNotStaked"},{"index":2,"name":"TokenNotExists"},{"index":3,"name":"TokenNotOwnedByCaller"},{"index":4,"name":"AllowanceInexistent"},{"index":5,"name":"ExceededMaxStakes"},{"index":6,"name":"TransferFailed"},{"index":7,"name":"NoClaimableRewards"},{"index":8,"name":"FailedUnstake"},{"index":9,"name":"OnlyOwnerAllowed"},{"index":10,"name":"NotAFoxHolder"},{"index":11,"name":"HasNotStaked"},{"index":12,"name":"NoClaimableEggs"},{"index":13,"name":"UnableToClaimEggs"},{"index":14,"name":"MintFailed"}]}},"path":["staking","staking","StakingError"]}},{"id":12,"type":{"def":{"primitive":"str"}}},{"id":13,"type":{"def":{"variant":{"variants":[{"fields":[{"type":14}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":14},{"name":"E","type":7}],"path":["Result"]}},{"id":14,"type":{"def":{"sequence":{"type":3}}}},{"id":15,"type":{"def":{"variant":{"variants":[{"fields":[{"type":3}],"index":0,"name":"Ok"},{"fields":[{"type":7}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":3},{"name":"E","type":7}],"path":["Result"]}},{"id":16,"type":{"def":{"composite":{"fields":[{"type":1,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":17,"type":{"def":{"primitive":"u32"}}},{"id":18,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"},
    PSP34:{"source":{"hash":"0xcd5102bb9f7967cba6f10b74936a41c52147e297a5b440405e639431417b6a5d","language":"ink! 4.3.0","compiler":"rustc 1.75.0-nightly","build_info":{"build_mode":"Release","cargo_contract_version":"3.2.0","rust_toolchain":"nightly-x86_64-unknown-linux-gnu","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"foxes","version":"0.2.1","authors":["Edinyanga Ottoho","Build3rs"],"description":"Foxes collection","repository":"https://github.com/Build3rs-Labs/foxies","homepage":"https://github.com/Build3rs-Labs/foxies","license":"Apache-2.0"},"spec":{"constructors":[{"args":[{"label":"max_supply","type":{"displayName":["Balance"],"type":5}},{"label":"owner","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":10},"selector":"0x9bae9d5e"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":0},"balance":{"displayName":["Balance"],"type":5},"blockNumber":{"displayName":["BlockNumber"],"type":3},"chainExtension":{"displayName":["ChainExtension"],"type":31},"hash":{"displayName":["Hash"],"type":30},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":9}},"events":[{"args":[{"docs":[],"indexed":false,"label":"owner","type":{"displayName":["AccountId"],"type":0}},{"docs":[],"indexed":false,"label":"operator","type":{"displayName":["AccountId"],"type":0}},{"docs":[],"indexed":false,"label":"id","type":{"displayName":["Option"],"type":18}},{"docs":[],"indexed":false,"label":"approved","type":{"displayName":["bool"],"type":4}}],"docs":[],"label":"Approval"},{"args":[{"docs":[],"indexed":false,"label":"from","type":{"displayName":["Option"],"type":17}},{"docs":[],"indexed":false,"label":"to","type":{"displayName":["Option"],"type":17}},{"docs":[],"indexed":false,"label":"id","type":{"displayName":["Id"],"type":14}}],"docs":[],"label":"Transfer"},{"args":[{"docs":[],"indexed":false,"label":"id","type":{"displayName":["Id"],"type":14}},{"docs":[],"indexed":false,"label":"key","type":{"displayName":["Vec"],"type":6}},{"docs":[],"indexed":false,"label":"data","type":{"displayName":["Vec"],"type":6}}],"docs":[],"label":"AttributeSet"}],"lang_error":{"displayName":["ink","LangError"],"type":12},"messages":[{"args":[],"default":false,"docs":[],"label":"PSP34::collection_id","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":13},"selector":"0xffa27a5f"},{"args":[{"label":"owner","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"PSP34::balance_of","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":15},"selector":"0xcde7e55f"},{"args":[{"label":"id","type":{"displayName":["Id"],"type":14}}],"default":false,"docs":[],"label":"PSP34::owner_of","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":16},"selector":"0x1168624d"},{"args":[{"label":"owner","type":{"displayName":["AccountId"],"type":0}},{"label":"operator","type":{"displayName":["AccountId"],"type":0}},{"label":"id","type":{"displayName":["Option"],"type":18}}],"default":false,"docs":[],"label":"PSP34::allowance","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":19},"selector":"0x4790f55a"},{"args":[{"label":"operator","type":{"displayName":["AccountId"],"type":0}},{"label":"id","type":{"displayName":["Option"],"type":18}},{"label":"approved","type":{"displayName":["bool"],"type":4}}],"default":false,"docs":[],"label":"PSP34::approve","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":20},"selector":"0x1932a8b0"},{"args":[{"label":"to","type":{"displayName":["AccountId"],"type":0}},{"label":"id","type":{"displayName":["Id"],"type":14}},{"label":"data","type":{"displayName":["Vec"],"type":6}}],"default":false,"docs":[],"label":"PSP34::transfer","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":20},"selector":"0x3128d61b"},{"args":[{"label":"from","type":{"displayName":["AccountId"],"type":0}},{"label":"to","type":{"displayName":["AccountId"],"type":0}},{"label":"id","type":{"displayName":["Id"],"type":14}},{"label":"data","type":{"displayName":["Vec"],"type":6}}],"default":false,"docs":[],"label":"PSP34::transfer_from","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":20},"selector":"0x718fd38b"},{"args":[],"default":false,"docs":[],"label":"PSP34::total_supply","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":24},"selector":"0x628413fe"},{"args":[],"default":false,"docs":[],"label":"PSP34::max_supply","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":24},"selector":"0x2b7fbd2c"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}}],"default":false,"docs":[],"label":"PSP34Mintable::mint","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":20},"selector":"0x6c41f2ec"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}},{"label":"attributes","type":{"displayName":["Vec"],"type":25}}],"default":false,"docs":[],"label":"PSP34Mintable::mint_with_attributes","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":20},"selector":"0x9d2918b6"},{"args":[{"label":"account","type":{"displayName":["AccountId"],"type":0}},{"label":"id","type":{"displayName":["Id"],"type":14}}],"default":false,"docs":[],"label":"PSP34Burnable::burn","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":20},"selector":"0x63c9877a"},{"args":[{"label":"id","type":{"displayName":["Id"],"type":14}},{"label":"key","type":{"displayName":["Vec"],"type":6}}],"default":false,"docs":[],"label":"PSP34Metadata::get_attribute","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":27},"selector":"0xf19d48d1"},{"args":[{"label":"index","type":{"displayName":["u128"],"type":5}}],"default":false,"docs":[],"label":"PSP34Enumerable::token_by_index","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":29},"selector":"0xcd0340d0"},{"args":[{"label":"owner","type":{"displayName":["AccountId"],"type":0}},{"label":"index","type":{"displayName":["u128"],"type":5}}],"default":false,"docs":[],"label":"PSP34Enumerable::owners_token_by_index","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":29},"selector":"0x3bcfb511"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"struct":{"fields":[{"layout":{"root":{"layout":{"leaf":{"key":"0x201f277a","ty":0}},"root_key":"0x201f277a"}},"name":"tokens_owner"},{"layout":{"root":{"layout":{"leaf":{"key":"0xa37f2b9b","ty":3}},"root_key":"0xa37f2b9b"}},"name":"tokens_per_owner"},{"layout":{"root":{"layout":{"leaf":{"key":"0x271b5b42","ty":4}},"root_key":"0x271b5b42"}},"name":"allowances"},{"layout":{"root":{"layout":{"leaf":{"key":"0x75a7d14d","ty":4}},"root_key":"0x75a7d14d"}},"name":"allowances_all"},{"layout":{"leaf":{"key":"0x00000000","ty":5}},"name":"total_supply"},{"layout":{"leaf":{"key":"0x00000000","ty":5}},"name":"max_supply"},{"layout":{"root":{"layout":{"leaf":{"key":"0x807b4b97","ty":6}},"root_key":"0x807b4b97"}},"name":"attributes"},{"layout":{"leaf":{"key":"0x00000000","ty":7}},"name":"all_tokens"},{"layout":{"root":{"layout":{"leaf":{"key":"0xde9c56e6","ty":5}},"root_key":"0xde9c56e6"}},"name":"all_tokens_index"},{"layout":{"root":{"layout":{"enum":{"dispatchKey":"0xbbea6ddb","name":"Id","variants":{"0":{"fields":[{"layout":{"leaf":{"key":"0xbbea6ddb","ty":2}},"name":"0"}],"name":"U8"},"1":{"fields":[{"layout":{"leaf":{"key":"0xbbea6ddb","ty":8}},"name":"0"}],"name":"U16"},"2":{"fields":[{"layout":{"leaf":{"key":"0xbbea6ddb","ty":3}},"name":"0"}],"name":"U32"},"3":{"fields":[{"layout":{"leaf":{"key":"0xbbea6ddb","ty":9}},"name":"0"}],"name":"U64"},"4":{"fields":[{"layout":{"leaf":{"key":"0xbbea6ddb","ty":5}},"name":"0"}],"name":"U128"},"5":{"fields":[{"layout":{"leaf":{"key":"0xbbea6ddb","ty":6}},"name":"0"}],"name":"Bytes"}}}},"root_key":"0xbbea6ddb"}},"name":"owned_tokens"},{"layout":{"root":{"layout":{"leaf":{"key":"0x2887308b","ty":5}},"root_key":"0x2887308b"}},"name":"owned_tokens_index"}],"name":"PSP34Data"}},"name":"data"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"0"}],"name":"Some"}}}},"name":"owner"}],"name":"Foxes"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"composite":{"fields":[{"type":1,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":1,"type":{"def":{"array":{"len":32,"type":2}}}},{"id":2,"type":{"def":{"primitive":"u8"}}},{"id":3,"type":{"def":{"primitive":"u32"}}},{"id":4,"type":{"def":{"primitive":"bool"}}},{"id":5,"type":{"def":{"primitive":"u128"}}},{"id":6,"type":{"def":{"sequence":{"type":2}}}},{"id":7,"type":{"def":{"sequence":{"type":5}}}},{"id":8,"type":{"def":{"primitive":"u16"}}},{"id":9,"type":{"def":{"primitive":"u64"}}},{"id":10,"type":{"def":{"variant":{"variants":[{"fields":[{"type":11}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":11},{"name":"E","type":12}],"path":["Result"]}},{"id":11,"type":{"def":{"tuple":[]}}},{"id":12,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":13,"type":{"def":{"variant":{"variants":[{"fields":[{"type":14}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":14},{"name":"E","type":12}],"path":["Result"]}},{"id":14,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2,"typeName":"u8"}],"index":0,"name":"U8"},{"fields":[{"type":8,"typeName":"u16"}],"index":1,"name":"U16"},{"fields":[{"type":3,"typeName":"u32"}],"index":2,"name":"U32"},{"fields":[{"type":9,"typeName":"u64"}],"index":3,"name":"U64"},{"fields":[{"type":5,"typeName":"u128"}],"index":4,"name":"U128"},{"fields":[{"type":6,"typeName":"Vec<u8>"}],"index":5,"name":"Bytes"}]}},"path":["psp34","types","Id"]}},{"id":15,"type":{"def":{"variant":{"variants":[{"fields":[{"type":3}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":3},{"name":"E","type":12}],"path":["Result"]}},{"id":16,"type":{"def":{"variant":{"variants":[{"fields":[{"type":17}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":17},{"name":"E","type":12}],"path":["Result"]}},{"id":17,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":0}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":0}],"path":["Option"]}},{"id":18,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":14}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":14}],"path":["Option"]}},{"id":19,"type":{"def":{"variant":{"variants":[{"fields":[{"type":4}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":4},{"name":"E","type":12}],"path":["Result"]}},{"id":20,"type":{"def":{"variant":{"variants":[{"fields":[{"type":21}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":21},{"name":"E","type":12}],"path":["Result"]}},{"id":21,"type":{"def":{"variant":{"variants":[{"fields":[{"type":11}],"index":0,"name":"Ok"},{"fields":[{"type":22}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":11},{"name":"E","type":22}],"path":["Result"]}},{"id":22,"type":{"def":{"variant":{"variants":[{"fields":[{"type":23,"typeName":"String"}],"index":0,"name":"Custom"},{"index":1,"name":"SelfApprove"},{"index":2,"name":"NotApproved"},{"index":3,"name":"TokenExists"},{"index":4,"name":"TokenNotExists"},{"index":5,"name":"ReachedMaxSupply"},{"fields":[{"type":23,"typeName":"String"}],"index":6,"name":"SafeTransferCheckFailed"},{"index":7,"name":"OutOfBoundsIndex"},{"index":8,"name":"NotAllowedToApprove"}]}},"path":["psp34","errors","PSP34Error"]}},{"id":23,"type":{"def":{"primitive":"str"}}},{"id":24,"type":{"def":{"variant":{"variants":[{"fields":[{"type":5}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":5},{"name":"E","type":12}],"path":["Result"]}},{"id":25,"type":{"def":{"sequence":{"type":26}}}},{"id":26,"type":{"def":{"tuple":[6,6]}}},{"id":27,"type":{"def":{"variant":{"variants":[{"fields":[{"type":28}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":28},{"name":"E","type":12}],"path":["Result"]}},{"id":28,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":6}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":6}],"path":["Option"]}},{"id":29,"type":{"def":{"variant":{"variants":[{"fields":[{"type":18}],"index":0,"name":"Ok"},{"fields":[{"type":12}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":18},{"name":"E","type":12}],"path":["Result"]}},{"id":30,"type":{"def":{"composite":{"fields":[{"type":1,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":31,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"},
    PSP22:{"source":{"hash":"0x631903ca0c5d64c7c7cabbf6798e2da7d282f2a5a1f92278fa10a8e1cdf54a52","language":"ink! 4.3.0","compiler":"rustc 1.75.0-nightly","build_info":{"build_mode":"Release","cargo_contract_version":"3.2.0","rust_toolchain":"nightly-x86_64-unknown-linux-gnu","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"eggs","version":"0.2.1","authors":["Edinyanga Ottoho","Build3rs"],"description":"Eggs ($EGGS)","repository":"https://github.com/Build3rs-Labs/foxies","homepage":"https://github.com/Build3rs-Labs/foxies","license":"Apache-2.0"},"spec":{"constructors":[{"args":[{"label":"name","type":{"displayName":["Option"],"type":5}},{"label":"symbol","type":{"displayName":["Option"],"type":5}},{"label":"decimals","type":{"displayName":["u8"],"type":2}},{"label":"owner","type":{"displayName":["AccountId"],"type":3}}],"default":false,"docs":[],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":6},"selector":"0x9bae9d5e"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":3},"balance":{"displayName":["Balance"],"type":0},"blockNumber":{"displayName":["BlockNumber"],"type":19},"chainExtension":{"displayName":["ChainExtension"],"type":20},"hash":{"displayName":["Hash"],"type":17},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":18}},"events":[{"args":[{"docs":[],"indexed":true,"label":"owner","type":{"displayName":["AccountId"],"type":3}},{"docs":[],"indexed":true,"label":"spender","type":{"displayName":["AccountId"],"type":3}},{"docs":[],"indexed":false,"label":"amount","type":{"displayName":["u128"],"type":0}}],"docs":[],"label":"Approval"},{"args":[{"docs":[],"indexed":true,"label":"from","type":{"displayName":["Option"],"type":16}},{"docs":[],"indexed":true,"label":"to","type":{"displayName":["Option"],"type":16}},{"docs":[],"indexed":false,"label":"value","type":{"displayName":["u128"],"type":0}}],"docs":[],"label":"Transfer"}],"lang_error":{"displayName":["ink","LangError"],"type":8},"messages":[{"args":[],"default":false,"docs":[],"label":"PSP22::total_supply","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x162df8c2"},{"args":[{"label":"owner","type":{"displayName":["AccountId"],"type":3}}],"default":false,"docs":[],"label":"PSP22::balance_of","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x6568382f"},{"args":[{"label":"owner","type":{"displayName":["AccountId"],"type":3}},{"label":"spender","type":{"displayName":["AccountId"],"type":3}}],"default":false,"docs":[],"label":"PSP22::allowance","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":9},"selector":"0x4d47d921"},{"args":[{"label":"to","type":{"displayName":["AccountId"],"type":3}},{"label":"value","type":{"displayName":["u128"],"type":0}},{"label":"_data","type":{"displayName":["Vec"],"type":10}}],"default":false,"docs":[],"label":"PSP22::transfer","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0xdb20f9f5"},{"args":[{"label":"from","type":{"displayName":["AccountId"],"type":3}},{"label":"to","type":{"displayName":["AccountId"],"type":3}},{"label":"value","type":{"displayName":["u128"],"type":0}},{"label":"_data","type":{"displayName":["Vec"],"type":10}}],"default":false,"docs":[],"label":"PSP22::transfer_from","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x54b3c76e"},{"args":[{"label":"spender","type":{"displayName":["AccountId"],"type":3}},{"label":"value","type":{"displayName":["u128"],"type":0}}],"default":false,"docs":[],"label":"PSP22::approve","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0xb20f1bbd"},{"args":[{"label":"spender","type":{"displayName":["AccountId"],"type":3}},{"label":"delta_value","type":{"displayName":["u128"],"type":0}}],"default":false,"docs":[],"label":"PSP22::increase_allowance","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x96d6b57a"},{"args":[{"label":"spender","type":{"displayName":["AccountId"],"type":3}},{"label":"delta_value","type":{"displayName":["u128"],"type":0}}],"default":false,"docs":[],"label":"PSP22::decrease_allowance","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0xfecb57d5"},{"args":[{"label":"amount","type":{"displayName":["Balance"],"type":0}}],"default":false,"docs":[],"label":"PSP22Mintable::mint","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0xfc3c75d4"},{"args":[],"default":false,"docs":[],"label":"PSP22Metadata::token_name","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":14},"selector":"0x3d261bd4"},{"args":[],"default":false,"docs":[],"label":"PSP22Metadata::token_symbol","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":14},"selector":"0x34205be5"},{"args":[],"default":false,"docs":[],"label":"PSP22Metadata::token_decimals","mutates":false,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":15},"selector":"0x7271b782"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"total_supply"},{"layout":{"root":{"layout":{"leaf":{"key":"0x45c746d4","ty":0}},"root_key":"0x45c746d4"}},"name":"balances"},{"layout":{"root":{"layout":{"leaf":{"key":"0x00efb3a1","ty":0}},"root_key":"0x00efb3a1"}},"name":"allowances"}],"name":"PSP22Data"}},"name":"data"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":1}},"name":"0"}],"name":"Some"}}}},"name":"name"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":1}},"name":"0"}],"name":"Some"}}}},"name":"symbol"},{"layout":{"leaf":{"key":"0x00000000","ty":2}},"name":"decimals"},{"layout":{"enum":{"dispatchKey":"0x00000000","name":"Option","variants":{"0":{"fields":[],"name":"None"},"1":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":3}},"name":"0"}],"name":"Some"}}}},"name":"owner"}],"name":"Token"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"primitive":"u128"}}},{"id":1,"type":{"def":{"primitive":"str"}}},{"id":2,"type":{"def":{"primitive":"u8"}}},{"id":3,"type":{"def":{"composite":{"fields":[{"type":4,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":4,"type":{"def":{"array":{"len":32,"type":2}}}},{"id":5,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":1}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":1}],"path":["Option"]}},{"id":6,"type":{"def":{"variant":{"variants":[{"fields":[{"type":7}],"index":0,"name":"Ok"},{"fields":[{"type":8}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":7},{"name":"E","type":8}],"path":["Result"]}},{"id":7,"type":{"def":{"tuple":[]}}},{"id":8,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":9,"type":{"def":{"variant":{"variants":[{"fields":[{"type":0}],"index":0,"name":"Ok"},{"fields":[{"type":8}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":0},{"name":"E","type":8}],"path":["Result"]}},{"id":10,"type":{"def":{"sequence":{"type":2}}}},{"id":11,"type":{"def":{"variant":{"variants":[{"fields":[{"type":12}],"index":0,"name":"Ok"},{"fields":[{"type":8}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":12},{"name":"E","type":8}],"path":["Result"]}},{"id":12,"type":{"def":{"variant":{"variants":[{"fields":[{"type":7}],"index":0,"name":"Ok"},{"fields":[{"type":13}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":7},{"name":"E","type":13}],"path":["Result"]}},{"id":13,"type":{"def":{"variant":{"variants":[{"fields":[{"type":1,"typeName":"String"}],"index":0,"name":"Custom"},{"index":1,"name":"InsufficientBalance"},{"index":2,"name":"InsufficientAllowance"},{"index":3,"name":"ZeroRecipientAddress"},{"index":4,"name":"ZeroSenderAddress"},{"fields":[{"type":1,"typeName":"String"}],"index":5,"name":"SafeTransferCheckFailed"}]}},"path":["psp22","errors","PSP22Error"]}},{"id":14,"type":{"def":{"variant":{"variants":[{"fields":[{"type":5}],"index":0,"name":"Ok"},{"fields":[{"type":8}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":5},{"name":"E","type":8}],"path":["Result"]}},{"id":15,"type":{"def":{"variant":{"variants":[{"fields":[{"type":2}],"index":0,"name":"Ok"},{"fields":[{"type":8}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":2},{"name":"E","type":8}],"path":["Result"]}},{"id":16,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":3}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":3}],"path":["Option"]}},{"id":17,"type":{"def":{"composite":{"fields":[{"type":4,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":18,"type":{"def":{"primitive":"u64"}}},{"id":19,"type":{"def":{"primitive":"u32"}}},{"id":20,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"}
};

const query_address = "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM";

const CAs = {
    factory: "5H3ZUFvJAL7hWRBeMMv5TFuCZY8Mx9xJgxMWPAUYciGqSsE1",
    staking: "5GSKauCmF3qm4BMoSp6MBJ465ksy2swnt33S9kbcjzJP14c2",
    eggs: "5HTEvmxJyJAxQbWaiymUiM6s5AWnQsmsYpUQ9zuHLezMYi6j",
    chickens: "5E7X6AtyF6xS14NFzuqTbitiU76trMJ3MZWcua5VCecz3r86",
    foxes: "5E2CdzNVDQktfzZwWhyMWdhFTqPfsQbm5in9dYPtM92G5DWW"
};

export const getGas = (api) => { 
    return { 
        gasLimit: api.registry.createType('WeightV2', { 
            refTime:120000000000, 
            proofSize:99999999999, 
        }), 
        storageDepositLimit:99999999999 
    }; 
}

export const getTokenIdsForBoth = async (api, account, balances) => {
    if (!api || !account) {
        return;
    }
    let tokenIds = {
        foxes: [],
        chickens: []
    };
    let gas = getGas(api);
    let psp34ContractChickens = new ContractPromise(api, ABIs.PSP34, CAs.chickens);
    for (let i = 0; i < balances[0]; i++) {
        const tokenIdResponseChickens = await psp34ContractChickens.query["psp34Enumerable::ownersTokenByIndex"](query_address, gas, account.address, i.toLocaleString("fullwide", {useGrouping:false}));
        const tokenIdChickens = tokenIdResponseChickens.output.toHuman().Ok;
        tokenIds.chickens.push(tokenIdChickens);
    }
    let psp34ContractFoxes = new ContractPromise(api, ABIs.PSP34, CAs.foxes);
    for (let i = 0; i < balances[1]; i++) {
        const tokenIdResponseFoxes = await psp34ContractFoxes.query["psp34Enumerable::ownersTokenByIndex"](query_address, gas, account.address, i.toLocaleString("fullwide", {useGrouping:false}));
        const tokenIdFoxes = tokenIdResponseFoxes.output.toHuman().Ok;
        tokenIds.foxes.push(tokenIdFoxes);
    }
    console.log(tokenIds);
    return tokenIds;
};


export const stake = async (api, account, token_type) => {
    return new Promise(async (resolve, reject) => {
        if (!api || !account || !token_type) {
            console.log("API, account, or token type not provided.");
            return;
        }

        let gas = getGas(api);
        let contractAddress = token_type === 'fox' ? CAs.foxes : CAs.chickens;
        let contract = new ContractPromise(api, ABIs.PSP34, contractAddress);
        let tokenIdToStake;

        try {
            const tokenIdResponse = await contract.query["psp34Enumerable::ownersTokenByIndex"](
                query_address, gas, account.address, "0"
            );
            tokenIdToStake = tokenIdResponse.output.toHuman().Ok;

            if (!tokenIdToStake) {
                throw new Error(`No ${token_type} token found to stake.`);
            }
        } catch (error) {
            console.error(error.message);
            reject(error.message);
            return;
        }

        let stakingContract = new ContractPromise(api, ABIs.staking, CAs.staking);
        let txName = token_type === 'fox' ? "stakeFox" : "stakeChicken";

        await stakingContract.tx[txName](gas, tokenIdToStake).signAndSend(
            account.address,
            { signer: account.signer },
            async ({ events = [], status }) => {
                if (status.isInBlock) {
                    // Handle isInBlock status
                } else if (status.isFinalized) {
                    let failed = false;
                    events.forEach(({ event: { method } }) => {
                        if (method === "ExtrinsicFailed") {
                            failed = true;
                        }
                    });
                    if (failed) {
                        console.log("Staking failed");
                        reject("Staking failed");
                    } else {
                        console.log("Staking successful");
                        resolve("Staking successful");
                    }
                }
            }
        );
    });
};

export const unstake = async (api, account, token_type) => {
    return new Promise(async (resolve, reject) => {
        if (!api || !account || !token_type) {
            console.log("API, account, or token type not provided.");
            return;
        }

        let gas = getGas(api);
        let stakingContract = new ContractPromise(api, ABIs.staking, CAs.staking);

        let txName = token_type === 'fox' ? "unstakeFoxes" : "unstakeChickens";
       
        await stakingContract.tx[txName](gas).signAndSend(
            account.address,
            { signer: account.signer },
            async ({ events = [], status }) => {
                if (status.isInBlock) {
                    // Handle isInBlock status
                } else if (status.isFinalized) {
                    let failed = false;
                    events.forEach(({ event: { method } }) => {
                        if (method === "ExtrinsicFailed") {
                            failed = true;
                        }
                    });
                    if (failed) {
                        console.log("Unstaking failed");
                        reject("Unstaking failed");
                    } else {
                        console.log("Unstaking successful");
                        resolve("Unstaking successful");
                    }
                }
            }
        );
    });
};


export const PSP34_approve = (api, account,  token_type) => {
    return new Promise(async (resolve, reject)=> {
        if (!api || !account) {
            console.log("API, account not provided.");
            return;
        }
    
        let gas = getGas(api);
    
        let contract = new ContractPromise(api, ABIs.PSP34, CAs[token_type]);
    
        await contract.tx["psp34::approve"](gas, CAs.staking, null, true).signAndSend(
            account.address,
            { signer: account.signer },
            async ({ events = [], status }) => {
                if (status.isInBlock) {
                    //in block
                } else if (status.isFinalized) {
                    let failed = false;
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        if (method == "ExtrinsicFailed") {
                            failed = true;
                        }
                    });
                    if (failed == true) {
                        toastError();
                        console.log("failed");
                        reject("error");
                    }
                    else {
                        toastSuccess();
                        console.log("worked")
                        resolve("success")
                    }
                }
            }
        );
    });
};

export const PSP34_allowance = async (api, account,  token_type) => {
    if (!api || !account) {
        console.log("API, account not provided.");
        return;
    }

    let gas = getGas(api);

    let contract = new ContractPromise(api, ABIs.PSP34, CAs[token_type]);
    
    let query_ = await contract.query["psp34::allowance"](query_address, gas, account.address, CAs.staking, null);
    let query = query_.output.toHuman().Ok;
    console.log('Is the staking allowed for ' + token_type + ' : ' + query);
    return query;
};

export const mint = async (api, account, type="random")=> {
    if (!api || !account) {
        return; //Wallet and/or API not connected
    }

    let gas = getGas(api);
    let contract = new ContractPromise(api, ABIs.factory, CAs.factory);

    let amount;
  
    if (type == "random") {
        amount = 6 * (10 ** 12); // 6 AZERO: Random mint
    }
    else {
        amount = 100 * (10 ** 12); // 100 AZERO: Precise fox mint
    }

    amount = api.createType("Balance", amount.toLocaleString("fullwide", {useGrouping:false}));
    gas.value = amount;

    await contract.tx["mintNft"](gas).signAndSend(
        account.address,
        { signer: account.signer },
        async ({ events = [], status }) => {
            if (status.isInBlock) {
                //in block
            } else if (status.isFinalized) {
                let failed = false;
                events.forEach(({ phase, event: { data, method, section } }) => {
                    if (method == "ExtrinsicFailed") {
                        failed = true;
                    }
                });
                if (failed == true) {
                    toastError();
                    console.log('fail !')
                }
                else {
                    toastSuccess();
                    console.log('minted !')
                }
            }
        }
    );
    
}

export const getBalance = async (api, account)=> {
    if (!api || !account) {
        return; //Wallet and/or API not connected
    }

    let gas = getGas(api);
    let contract = new ContractPromise(api, ABIs.PSP22, CAs.eggs);
    let balance_ = await contract.query["psp22::balanceOf"](query_address, gas, account.address);
    let balance = balance_.output.toHuman().Ok;    
    console.log('the balance is :' + balance)

}


export const getBalances = async (api, account)=> {
    if (!api || !account) {
        return; //Wallet and/or API not connected
    }

    let gas = getGas(api);
    let contract = new ContractPromise(api, ABIs.PSP34, CAs.chickens);
    let balance_ = await contract.query["psp34::balanceOf"](query_address, gas, account.address);
    let balance = parseFloat(balance_.output.toHuman().Ok.replace(/\,/g, ""));
    console.log('the balance of chickens is :' + balance);

    let contract2 = new ContractPromise(api, ABIs.PSP34, CAs.foxes);
    let balance_2 = await contract2.query["psp34::balanceOf"](query_address, gas, account.address);
    let balance2 = parseFloat(balance_2.output.toHuman().Ok.replace(/\,/g, ""));
    console.log('the balance of foxes is :' + balance2)

    let contract3 = new ContractPromise(api, ABIs.PSP22, CAs.eggs);
    let balance_3 = await contract3.query["psp22::balanceOf"](query_address, gas, account.address);
    let balance3Raw = parseFloat(balance_3.output.toHuman().Ok.replace(/\,/g, ""));
    let balance3 = parseFloat(balance3Raw) / 1e6;
    console.log('The balance of eggs is: ' + balance3Raw);
    


    let contract4 = new ContractPromise(api, ABIs.staking, CAs.staking);
    let balance_4 = await contract4.query["getClaimableForFox"](query_address, gas, account.address);
    let balance4Raw = parseFloat(balance_4.output.toHuman().Ok.replace(/\,/g, ""));
    console.log('The getClaimableForFox is: ' + balance4Raw);
    let balance4 = parseFloat(balance4Raw) / 1e6;

    let contract5 = new ContractPromise(api, ABIs.staking, CAs.staking);
    let balance_5 = await contract5.query["getClaimableEggs"](query_address, gas, account.address);
    let balance5Raw = parseFloat(balance_5.output.toHuman().Ok.replace(/\,/g, ""));
    console.log('The getClaimableEggs is: ' + balance5Raw);
    let balance5 = parseFloat(balance4Raw) / 1e6;

    let balances = [balance, balance2, balance3];

    return balances;

}


export const transfer = async (api, account)=> {
    if (!api || !account) {
        return; //Wallet and/or API not connected
    }

    let gas = getGas(api);

    let contract = new ContractPromise(api, ABIs.PSP22, CAs.eggs);

    let amount = 10 * (10 ** 12); // 10 AZERO
    amount = api.createType("Balance", amount.toLocaleString("fullwide", {useGrouping:false}));

    //to make the method payable (with AZERO), you use gas.value = amount

    await contract.tx["psp22::transfer"](gas, query_address, amount, []).signAndSend(
        account.address,
        { signer: account.signer },
        async ({ events = [], status }) => {
            if (status.isInBlock) {
                //in block
            } else if (status.isFinalized) {
                let failed = false;
                events.forEach(({ phase, event: { data, method, section } }) => {
                    if (method == "ExtrinsicFailed") {
                        failed = true;
                    }
                });
                if (failed == true) {
                    //failed
                }
                else {
                    //completed
                }
            }
        }
    );

}