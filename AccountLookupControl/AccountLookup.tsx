import * as React from "react";
import { ComboBox, IComboBoxOption, IComboBox } from "@fluentui/react";

export interface AccountLookupProps {
    selectedKey?: string | number;
    onChange: (key: string | number | undefined) => void;
    context: ComponentFramework.Context<unknown>;
    placeholder?: string;
}

interface AccountEntity {
    accountid: string;
    name: string;
}

const AccountLookup: React.FC<AccountLookupProps> = ({ selectedKey, onChange, context, placeholder }) => {
    const [options, setOptions] = React.useState<IComboBoxOption[]>([]);

    React.useEffect(() => {
        // Fetch accounts from Dataverse on mount
        const fetchAccounts = async () => {
            console.log("[AccountLookup] Fetching accounts from Dataverse (initial load)...");
            try {
                console.log("[AccountLookup] Calling context.webAPI.retrieveMultipleRecords (initial load)");
                const result = await context.webAPI.retrieveMultipleRecords("account", "$select=accountid,name&$top=10");
                console.log("[AccountLookup] WebAPI call result (initial load):", result);
                const opts = (result.entities as AccountEntity[]).map((a) => ({
                    key: a.accountid,
                    text: a.name
                }));
                setOptions(opts);
                console.log("[AccountLookup] Options set (initial load):", opts);
            } catch (err) {
                console.error("[AccountLookup] Error fetching accounts (initial load):", err);
                setOptions([]);
            }
        };
        void fetchAccounts();
    }, [context]);

    const handleChange = (_event: React.FormEvent<IComboBox>, option?: IComboBoxOption) => {
        onChange(option ? option.key : undefined);
    };

    const handleFilter = async (_event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
        const filter = value ? `&$filter=contains(name,'${value.replace(/'/g, "''")}')` : '';
        console.log(`[AccountLookup] Filtering accounts with value: '${value}'`);
        try {
            console.log("[AccountLookup] Calling context.webAPI.retrieveMultipleRecords (filter)");
            const result = await context.webAPI.retrieveMultipleRecords(
                "account",
                `$select=accountid,name&$top=10${filter}`
            );
            console.log("[AccountLookup] WebAPI call result (filter):", result);
            const opts = (result.entities as AccountEntity[]).map((a) => ({
                key: a.accountid,
                text: a.name
            }));
            setOptions(opts);
            console.log("[AccountLookup] Options set (filter):", opts);
        } catch (err) {
            console.error("[AccountLookup] Error filtering accounts:", err);
            setOptions([]);
        }
    };

    return (
        <ComboBox
            options={options}
            selectedKey={selectedKey}
            onChange={handleChange}
            onInput={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => { void handleFilter(event, option, index, value); }}
            placeholder={placeholder ?? "Select an account..."}
            style={{ minWidth: 250 }}
            allowFreeInput={true}
        />
    );
};

export default AccountLookup;
