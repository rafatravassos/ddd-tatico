import Address from "../value-object/address";

export interface CustomerInterface {
    get Address() :Address;
    get name(): string;
    get rewardPoints(): number;
    get id(): string;
    changeAddress(address: Address): void;
    addRewardPoints(points: number): void;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
}