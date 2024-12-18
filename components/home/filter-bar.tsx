import {
  ACCOUNT_TYPES,
  Areas,
  Branches,
  CUSTOMER_TYPES,
  REGIONS,
} from "@/constants/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { CircleDollarSign, Coins, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

const FilterBar = ({
  selectedRegion,
  selectedArea,
  selectedBranch,
  selectedCustomer,
  selectedAccount,
  handleSelection,
  selectedMode,
  setSelectedMode,
  setConnections,
}: {
  selectedRegion: string;
  selectedArea: string;
  selectedBranch: string;
  selectedCustomer: string;
  selectedAccount: string;
  selectedMode: string;
  setConnections: any;
  setSelectedMode: (value: string) => void;
  handleSelection: (index: number, value: string) => void;
}) => {
  const [formValues, setFormValues] = useState({
    name: "",
    debit: "",
    credit: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formValues.name || !formValues.debit || !formValues.credit) return;

    setConnections((prev: any) => [...prev, formValues]);
    setFormValues({ name: "", debit: "", credit: "" });
    setDialogOpen(false);
  };

  return (
    <div className="absolute top-0 w-full">
      <div className="w-full h-14 bg-popover rounded-2xl shadow-lg z-50 border px-4 flex items-center">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3">
            <Select
              value={selectedRegion}
              onValueChange={(value) => handleSelection(0, value)}
            >
              <SelectTrigger className="min-w-[150px] max-w-[150px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(REGIONS).map((key, index) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedArea}
              onValueChange={(value) => handleSelection(1, value)}
            >
              <SelectTrigger className="min-w-[150px] max-w-[150px]">
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(Areas).map((key, index) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedBranch}
              onValueChange={(value) => handleSelection(2, value)}
            >
              <SelectTrigger className="min-w-[150px] max-w-[150px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(Branches)?.map((key: any, index: number) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedCustomer}
              onValueChange={(value) => handleSelection(3, value)}
            >
              <SelectTrigger className="min-w-[150px] max-w-[150px]">
                <SelectValue placeholder="Customer Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(CUSTOMER_TYPES)?.map((key: any, index: number) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedAccount}
              onValueChange={(value) => handleSelection(4, value)}
            >
              <SelectTrigger className="min-w-[150px] max-w-[150px]">
                <SelectValue placeholder="Account Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(ACCOUNT_TYPES)?.map((key: any, index: number) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ToggleGroup
              variant="outline"
              size="icon"
              type="single"
              value={selectedMode}
              onValueChange={setSelectedMode}
            >
              <ToggleGroupItem value="volume" aria-label="Toggle total volume">
                <CircleDollarSign className="h-3 w-3" />
              </ToggleGroupItem>
              <ToggleGroupItem value="count" aria-label="Toggle count">
                <Coins className="h-3 w-3" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-8">
                  <Plus className="h-4 w-4" />
                  Add Bank
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Bank</DialogTitle>
                  <DialogDescription>
                    Connect a new bank with name and credit value.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Value" className="text-right">
                      Debit
                    </Label>
                    <Input
                      id="debit"
                      name="debit"
                      value={formValues.debit}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Value" className="text-right">
                      Credit
                    </Label>
                    <Input
                      id="credit"
                      name="credit"
                      value={formValues.credit}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit} className="h-8">
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
