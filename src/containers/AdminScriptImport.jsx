import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import theme from "../styles/theme";
import CampaignFormSectionHeading from "../components/CampaignFormSectionHeading";
import TextField from "material-ui/TextField";
import { ListItem, List } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import ErrorIcon from "material-ui/svg-icons/alert/error";

const errorIcon = <ErrorIcon color={theme.colors.red} />;

const styles = StyleSheet.create({
  buttonDiv: {
    marginTop: "10px"
  }
});

export default class AdminScriptImport extends Component {
  static propTypes = {
    startImport: PropTypes.func,
    hasPendingJob: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  startImport = async () => {
    const res = await this.props.startImport(this.state.url);
    if (res.errors) {
      this.setState({ error: res.errors.message });
    }
  };

  handleUrlChange = (_eventId, newValue) => this.setState({ url: newValue });

  renderErrors = () =>
    this.state.error && (
      <List>
        <ListItem primaryText={this.state.error} leftIcon={errorIcon} />
      </List>
    );

  render() {
    return (
      <div>
        <CampaignFormSectionHeading
          title="Script Import"
          subtitle="You can import interactions and canned responses from a properly formatted Google Doc."
        />
        <TextField
          hintText="URL of the Google Doc"
          floatingLabelText="Google Doc URL"
          style={{ width: "100%" }}
          onChange={this.handleUrlChange}
        />
        {this.renderErrors()}
        <div className={css(styles.buttonDiv)}>
          <RaisedButton
            label="Import"
            disabled={this.props.hasPendingJob}
            primary
            onTouchTap={this.startImport}
          />
        </div>
      </div>
    );
  }
}
