const popoverRight = (
    <Popover id="popover-positioned-scrolling-right" title="Popover right">
      <strong>Holy guacamole!</strong> Check this info.
    </Popover>
  );
  
  class Positioner extends React.Component {
    render() {
      return (
        <ButtonToolbar style={{ padding: '100px 0' }}>
          <OverlayTrigger
            container={this}
            trigger="click"
            placement="left"
            overlay={popoverLeft}
          >
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
          <OverlayTrigger
            container={this}
            trigger="click"
            placement="top"
            overlay={popoverTop}
          >
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
          <OverlayTrigger
            container={this}
            trigger="click"
            placement="bottom"
            overlay={popoverBottom}
          >
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
          <OverlayTrigger
            container={this}
            trigger="click"
            placement="right"
            overlay={popoverRight}
          >
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
        </ButtonToolbar>
      );
    }
  }
  
  render(<Positioner />);