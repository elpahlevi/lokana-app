import L from "leaflet";

export default function TooltipText() {
  const { draw, edit } = L.drawLocal;
  draw.toolbar.buttons.rectangle = "Draw a domain";
  draw.handlers.rectangle.tooltip.start = "Click and drag to draw a domain";
  edit.toolbar.actions.clearAll.title = "Clear all domain";
  edit.toolbar.buttons.edit = "Edit a domain";
  edit.toolbar.buttons.editDisabled = "No domain to edit";
  edit.toolbar.buttons.remove = "Remove a domain";
  edit.toolbar.buttons.removeDisabled = "No domain to remove";
  edit.handlers.edit.tooltip.text = "Drag handles or markers to edit a domain.";
  edit.handlers.remove.tooltip.text = "Click on a domain to remove.";
}
