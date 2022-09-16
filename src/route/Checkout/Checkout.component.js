import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "Component/ContentWrapper";
import ProgressBar from "Component/ProgressBar/ProgressBar";
import "./Checkout.override.style";

export class Checkout extends SourceCheckout {
  state = {
    steps: [
      {
        stepAction: "SHIPPING_STEP",
        name: "Shipping",
        active: false,
      },
      {
        stepAction: "BILLING_STEP",
        name: "Review & Payments",
        active: false,
      },
    ],
    lastStep: false,
  };
  updateState = () => {
    const { checkoutStep } = this.props;
    let isLastStep = true;
    const newSteps = this.state.steps.map((step) => {
      if (step.stepAction === checkoutStep) {
        isLastStep = false;
        return { ...step, active: true };
      }
      return step;
    });
    this.setState({
      steps: newSteps,
      previousStep: checkoutStep,
      lastStep: isLastStep,
    });
  };
  componentDidMount() {
    this.updateState();
  }
  componentDidUpdate() {
    const { previousStep } = this.state;
    const { checkoutStep } = this.props;

    if (previousStep === checkoutStep) {
      return;
    } else {
      this.updateState();
    }
  }

  render() {
    return (
      <main block="Checkout">
        <ProgressBar steps={this.state.steps} lastStep={this.state.lastStep} />
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;
