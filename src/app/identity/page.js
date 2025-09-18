import { getIdentity, resolveDID } from "@/utils/dlt"
import IdentityCard from "./components/IdentityCard"

// This disables cache on this page, as in case the DLT booth is unreachable IN ANY MOMENT, it should not use cache data...
// Thinking realistically tho, one marketplace will not have more than one identity, so we can discuss if re-enabling cache here!
export const revalidate = 0

export default async function Page () {
    // This is a copy of what the 3rd step of the onboardingForm does... The ideal thing would be that dlt.js has a method to return directly
    // the blockhainAccountId or something like that...
    const identity = await getIdentity()
    const did = identity?.data?.sub
    const responseResolvedDID = await resolveDID(did)
    const vmWithBlockchainId = responseResolvedDID?.data?.verificationMethod?.find((vm) => vm.blockchainAccountId)
    const blockchainAccountId = vmWithBlockchainId?.blockchainAccountId
    if (blockchainAccountId) {
        const [, address] = blockchainAccountId.split('eip155:1:')
        return (
            <IdentityCard identity={identity?.data} address={address} error={identity?.error} />
        )
      }
    return (
        <IdentityCard/>
    )
}
