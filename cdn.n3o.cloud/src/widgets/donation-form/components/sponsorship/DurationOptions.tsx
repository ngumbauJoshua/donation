import { useId } from "react"
import { ToggleGroup, ToggleGroupItem, Label } from "@n3oltd/n3o-ui-components"
import { PublishedCommitmentDuration } from "@n3oltd/karakoram.sponsorships.sdk.connect";

type Props = {
  durations: PublishedCommitmentDuration[];
  defaultValue?: string;
  heading: string;
  onDurationChange?: (duration: PublishedCommitmentDuration) => void;
}

export function DurationOptions(props: Props) {
  const id = useId()

  return (
    <div className="space-y-2 n3o-duration-options">
      <h3 className="text-foreground text-sm leading-none font-medium n3o-duration-options__heading">
        {props.heading}
      </h3>
      <ToggleGroup type="single" variant="outline" className="justify-start w-full n3o-duration-options__toggle-group" value={props.defaultValue}>
        {props.durations.map((item) => (
          <ToggleGroupItem
            key={`${id}-${item.id}`}
            onClick={() => props.onDurationChange?.(item)}
            value={item.id!}
            className="n3o-duration-options__toggle-item"
          >
            <Label className="n3o-duration-options__toggle-label">{item.name}</Label>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
