import { DonationFormHeader } from "@n3oltd/n3o-ui-components";
import { PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";

interface DonationHeaderProps {
  designation: PublishedDesignation;
   onDesignationChange: (open: boolean) => void;
   hideAction?: boolean;
}

export function DonationHeader({ designation, onDesignationChange, hideAction }: DonationHeaderProps) {
  return (
    <DonationFormHeader className="bg-form-header">
      <DonationFormHeader.TitleIcon>
        <img
          src={designation.icon}
          className="size-8 rounded"
          alt={designation.name}
        />
      </DonationFormHeader.TitleIcon>
      <DonationFormHeader.Title
        title={designation.name}
        description=""
      />
      {!hideAction && (
        <DonationFormHeader.Action onClick={() => {
          onDesignationChange(true)
        }}>
          {null}
        </DonationFormHeader.Action>
      )}
    </DonationFormHeader>
  );
}
